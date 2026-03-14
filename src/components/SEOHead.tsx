import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
}

const BASE_URL = "https://seenhq.co.uk";

const SEOHead = ({ title, description, path = "/" }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", `${BASE_URL}${path}`, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    // JSON-LD
    let script = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Seen HQ",
      description: "Professional short-form video promotion for businesses, properties, and products across the UK.",
      url: BASE_URL,
      areaServed: "GB",
      serviceType: "Video Marketing",
    });

    return () => {
      if (script) script.remove();
    };
  }, [title, description, path]);

  return null;
};

export default SEOHead;
