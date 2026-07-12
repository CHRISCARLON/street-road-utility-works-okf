import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";

const site = lume({
  src: "/src",
  dest: "./_site",
});

site.use(jsx());
site.use(tailwindcss());
site.use(postcss());

// Each OKF bundle under src/bundles/<key>/ uses spec-conformant markdown links
// ending in `.md` — either bundle-root-absolute (/conceptual/network.md) or
// relative to the source file's directory (service-area.md). Rewrite both to the
// site's pretty URLs at output time, so the on-disk tree stays a valid OKF bundle
// while the rendered site links correctly. Bundle-root-absolute links are
// resolved against the page's `okf_root` (declared in each bundle's _data.yml);
// relative links are resolved against the page's SOURCE directory (not its pretty
// output URL, which has an extra path segment from the index.html expansion).
function normalize(path: string): string {
  const out: string[] = [];
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return "/" + out.join("/");
}

function toPretty(mdPath: string): string {
  return mdPath.replace(/\/index\.md$/, "/").replace(/\.md$/, "/");
}

// Escape text for safe innerHTML insertion (titles can contain & < >).
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// deno-lint-ignore no-explicit-any
function pageUrl(page: any): string {
  return (page.data.url as string) ?? "";
}
// deno-lint-ignore no-explicit-any
function pageLabel(page: any): string {
  const t = page.data.title as string | undefined;
  if (t) return t;
  const parts = pageUrl(page).split("/").filter(Boolean);
  return parts[parts.length - 1] ?? pageUrl(page);
}

site.process([".html"], (pages) => {
  // Pass 1: rewrite every `.md` link to its pretty URL, and record the reverse
  // link graph (target URL -> the pages that link to it) as we go, so the on-disk
  // OKF cross-links become navigable "Referenced by" backlinks on the target.
  const incoming = new Map<string, Map<string, string>>(); // target -> (sourceUrl -> label)
  for (const page of pages) {
    const doc = page.document;
    if (!doc) continue;
    // okf_root is set per bundle in src/bundles/<key>/_data.yml. Pages outside a
    // bundle (landing, docs) don't set it and use only source-relative .md links.
    const okfRoot = page.data.okf_root as string | undefined;
    // src.path is the extension-less source path within src/, e.g.
    // /bundles/muddi/conceptual/network or /bundles/nsg/records/index.
    const srcPath: string = page.src.path;
    const srcDir = srcPath.slice(0, srcPath.lastIndexOf("/"));
    const fromUrl = pageUrl(page);
    const fromLabel = pageLabel(page);
    // Index/listing pages link to everything they enumerate; that's navigation,
    // not a semantic reference, so don't record backlinks *from* them.
    const isIndex = srcPath.endsWith("/index");
    for (const a of doc.querySelectorAll("a[href$='.md']")) {
      const el = a as unknown as {
        getAttribute(n: string): string | null;
        setAttribute(n: string, v: string): void;
      };
      const href = el.getAttribute("href");
      if (!href) continue;
      const abs = href.startsWith("/")
        ? (okfRoot ?? "") + href // bundle-root absolute
        : normalize(`${srcDir}/${href}`); // relative to the source directory
      const target = toPretty(abs);
      el.setAttribute("href", target);
      if (target && target !== fromUrl && !isIndex) {
        if (!incoming.has(target)) incoming.set(target, new Map());
        incoming.get(target)!.set(fromUrl, fromLabel);
      }
    }
  }

  // Pass 2: render a "Referenced by" list on each concept page that is the
  // target of at least one cross-link.
  for (const page of pages) {
    const doc = page.document;
    if (!doc) continue;
    const refs = incoming.get(pageUrl(page));
    if (!refs || refs.size === 0) continue;
    const host = doc.querySelector("article.concept");
    if (!host) continue;
    const items = [...refs.entries()]
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([url, label]) => `<li><a href="${url}">${esc(label)}</a></li>`)
      .join("");
    const nav = doc.createElement("nav");
    nav.className = "backlinks";
    nav.innerHTML = `<h2>Referenced by</h2><ul>${items}</ul>`;
    host.appendChild(nav);
  }
});

export default site;
