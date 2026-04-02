// SEO meta tag helper — call useSEO() at the top of each page
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

const BASE_TITLE = "MeaningMatters Network";
const DEFAULT_IMAGE = "/favicon.png";
const SITE_URL = "https://meaningmatters.org";

export function useSEO({ title, description, image = DEFAULT_IMAGE }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | ${BASE_TITLE}`;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", `${title} | ${BASE_TITLE}`, true);
    setMeta("og:description", description, true);
    setMeta("og:image", `${SITE_URL}${image}`, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title} | ${BASE_TITLE}`);
    setMeta("twitter:description", description);
  }, [title, description, image]);
}
