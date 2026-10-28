import { spanishPages, spanishUrl } from "@/lib/spanishPages";
import { siteUrl } from "@/lib/routes";
import fs from "@/lib/contentFs";
import path from "node:path";

type RouteContext = { params: Promise<{ slug?: string[] }> };

const css = `
  :root{color-scheme:light;font-family:Arial,Helvetica,sans-serif;color:#14243c;background:#fff}
  *{box-sizing:border-box}body{margin:0;line-height:1.6}a{color:#1764a7}a:hover{text-decoration-thickness:2px}
  .es-header{border-bottom:1px solid #dce5ef;background:#fff;position:relative;z-index:2}
  .es-header-inner,.es-wrap,.es-footer-inner{max-width:1180px;margin:auto;padding-left:24px;padding-right:24px}
  .es-header-inner{min-height:78px;display:flex;align-items:center;gap:24px;justify-content:space-between}
  .es-logo{display:flex;align-items:center;gap:10px;color:#14243c;text-decoration:none;font-weight:800;font-size:22px;white-space:nowrap}
  .es-logo img{width:128px;height:72px;object-fit:contain}.es-nav{display:flex;flex-wrap:wrap;gap:18px;align-items:center;font-size:14px;font-weight:700}
  .es-nav a{color:#193b5f;text-decoration:none}.es-nav a:hover{text-decoration:underline}.es-nav .es-lang{border:1px solid #bdd4e8;border-radius:4px;padding:7px 10px}
  .es-hero{background:#f4f9fd;border-bottom:1px solid #e0eaf1;padding:42px 0 46px}.es-kicker{font-size:12px;color:#1f66a8;text-transform:uppercase;font-weight:800;letter-spacing:.04em}
  h1{font-size:clamp(32px,4.5vw,54px);line-height:1.09;max-width:850px;margin:12px 0 18px}h2{font-size:clamp(23px,2.4vw,30px);line-height:1.25;margin:36px 0 14px}
  p,li{font-size:17px;max-width:850px}.es-intro{font-size:21px;line-height:1.48;max-width:850px;color:#475b70;margin:0 0 18px}
  .es-meta{font-size:13px;color:#586c7f}.es-meta a{font-weight:700}.es-body{padding-top:28px;padding-bottom:60px}
  .es-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:900px;margin:28px 0}
  .es-grid a{display:flex;flex-direction:column;gap:5px;border:1px solid #d8e6f2;border-radius:6px;padding:17px 20px;text-decoration:none;background:#fff}
  .es-grid a:hover{border-color:#226bb4;background:#f7fbff}.es-grid strong{font-size:18px}.es-grid span{color:#586c7f;font-size:14px}
  .es-table{max-width:100%;overflow-x:auto;margin:22px 0 30px;border:1px solid #d9e4ee;border-radius:5px}table{width:100%;border-collapse:collapse;min-width:650px;font-size:15px}
  th,td{padding:12px 15px;border-bottom:1px solid #e1e9f0;text-align:left;vertical-align:top}th{background:#f0f6fc;font-weight:700}tr:last-child td{border:0}
  .es-callout{border-left:4px solid #f3ce45;background:#fffbea;padding:16px 22px;margin:40px 0;max-width:850px}.es-callout p{margin:6px 0}
  .es-footer{background:#122744;color:#fff;padding:34px 0}.es-footer a{color:#fff}.es-footer-inner{display:flex;justify-content:space-between;gap:22px;flex-wrap:wrap;font-size:14px}
  @media(max-width:760px){.es-header-inner{align-items:flex-start;flex-direction:column;padding-top:12px;padding-bottom:14px;gap:8px}.es-nav{gap:8px 15px;font-size:13px}.es-hero{padding:28px 0 34px}.es-grid{grid-template-columns:1fr}p,li{font-size:16px}.es-intro{font-size:18px}}
`;

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

const analyticsScript = `<script>(function(){
  var q=new URLSearchParams(location.search);
  if(q.get('internal')==='1')localStorage.setItem('fluidrwa:analytics-internal','1');
  if(q.get('analytics')==='off')localStorage.setItem('fluidrwa:analytics-disabled','1');
  var bot=/bot|crawler|spider|headless|lighthouse|pagespeed|pingdom|uptime|monitoring|preview/i.test(navigator.userAgent);
  if(!['www.fluidrwa.com','fluidrwa.com'].includes(location.hostname)||navigator.webdriver||bot||q.get('source')==='qa-test'||localStorage.getItem('fluidrwa:analytics-internal')==='1'||localStorage.getItem('fluidrwa:analytics-disabled')==='1')return;
  var measurement=document.createElement('script');measurement.src='/assets/measurement.js?v=4';
  measurement.onload=function(){
    var ga=document.createElement('script');ga.async=true;ga.src='https://www.googletagmanager.com/gtag/js?id=G-Q5L2HZK162';document.head.appendChild(ga);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments)};
    var safe=new URLSearchParams();['utm_source','utm_medium','utm_campaign','utm_id','utm_content','utm_term','utm_source_platform','gclid','gbraid','wbraid'].forEach(function(k){if(q.has(k))safe.set(k,q.get(k))});
    var pageLocation=location.origin+location.pathname+(safe.size?'?'+safe.toString():'');
    window.gtag('js',new Date());
    window.gtag('config','G-Q5L2HZK162',{send_page_view:false,page_path:location.pathname,page_location:pageLocation,site_host:location.hostname,deployment_platform:'cloudflare'});
    window.fluidRwaTrackEvent=function(name,params){var clean=window.fluidRwaSanitizeAnalytics?window.fluidRwaSanitizeAnalytics(params||{}):{};window.gtag('event',name,Object.assign({page_path:location.pathname,page_location:pageLocation,engagement_source:'fluidrwa_site',transport_type:'beacon'},clean))};
    window.fluidRwaTrackEvent('page_view');window.dispatchEvent(new Event('fluidrwa:analytics-ready'));
  };document.head.appendChild(measurement);
})();</script>`;

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const path = slug?.length ? `/${slug.join("/")}` : "/";
  const page = spanishPages.find((item) => item.path === path);
  if (!page) return new Response("Not found", { status: 404 });

  const fullFile = pathModuleForSpanish(path);
  if (fs.existsSync(fullFile)) {
    const fullHtml = fs.readFileSync(fullFile, "utf8");
    const buildRevision = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_BUILD_REVISION || "local";
    const publishedHtml = fullHtml
      .replace(/<body\b/, `<body data-fluidrwa-build="${escapeHtml(buildRevision)}"`)
      .replace("</body>", `${analyticsScript}</body>`);
    return new Response(publishedHtml, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600",
        "x-fluidrwa-build": buildRevision
      }
    });
  }

  const es = `${siteUrl}${spanishUrl(path)}`;
  const en = `${siteUrl}${path === "/" ? "" : path}`;
  const image = `${siteUrl}${page.image || "/assets/social/fluidrwa-preview.jpg"}`;
  const buildRevision = process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_BUILD_REVISION || "local";
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": path.startsWith("/blog/") ? "Article" : "WebPage",
    headline: page.title,
    description: page.description,
    inLanguage: "es",
    url: es,
    isBasedOn: en,
    publisher: { "@type": "Organization", name: "FluidRWA", url: siteUrl },
    dateModified: "2026-10-27"
  }).replaceAll("<", "\\u003c");

  const body = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}"><link rel="canonical" href="${es}"><link rel="alternate" hreflang="es" href="${es}"><link rel="alternate" hreflang="en" href="${en}"><link rel="alternate" hreflang="x-default" href="${en}"><meta property="og:type" content="${path.startsWith("/blog/") ? "article" : "website"}"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:url" content="${es}"><meta property="og:image" content="${image}"><link rel="icon" href="/assets/favicon.png"><style>${css}</style><script type="application/ld+json">${jsonLd}</script></head><body data-fluidrwa-build="${escapeHtml(buildRevision)}"><header class="es-header"><div class="es-header-inner"><a class="es-logo" href="/es" aria-label="FluidRWA, inicio en español"><img src="/assets/fluidrwa-small-logo.png" alt="FluidRWA" width="128" height="72"></a><nav class="es-nav" aria-label="Navegación principal"><a href="/es/web3vendorecosystem">Proveedores</a><a href="/es/vendors/tokenization-platforms">Tokenización</a><a href="/es/vendors/crypto-custody-providers">Custodia</a><a href="/es/vendors/fiat-on-off-ramp-providers">Pagos</a><a href="mailto:contact@fluidrwa.com">Contacto</a><a class="es-lang" href="${en}" lang="en" hreflang="en">English</a></nav></div></header><section class="es-hero"><div class="es-wrap"><div class="es-kicker">${escapeHtml(page.eyebrow)}</div><h1>${escapeHtml(page.title.split(" | ")[0])}</h1><p class="es-intro">${escapeHtml(page.intro)}</p><div class="es-meta">Actualizado: 27 de octubre de 2026</div></div></section><main class="es-wrap es-body">${page.body}<aside class="es-callout"><strong>¿Está evaluando proveedores?</strong><p>Cuéntenos qué quiere construir, dónde operará y qué decisión necesita tomar. Escríbanos a <a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a>.</p></aside></main><footer class="es-footer"><div class="es-footer-inner"><span>© FluidRWA · Guías para evaluar infraestructura de activos digitales</span><span><a href="/es">Inicio</a> · <a href="${en}" lang="en">Original en inglés</a></span></div></footer>${analyticsScript}</body></html>`;
  return new Response(body, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}

function pathModuleForSpanish(route: string): string {
  const stem = route === "/" ? "index" : route.slice(1).replaceAll("/", "__");
  return path.join(process.cwd(), "content", "es-full", `${stem}.html`);
}
