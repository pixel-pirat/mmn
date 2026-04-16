import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string; // e.g. "/about", "/programs"
  type?: "website" | "article";
}

export const SITE_URL = "https://www.meaningmattersnetwork.org";
const BASE_TITLE = "MeaningMatters Network";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function useSEO({ title, description, image, path = "", type = "website" }: SEOProps) {
  const fullTitle = `${title} | ${BASE_TITLE}`;
  const ogImage = image ?? DEFAULT_IMAGE;
  const canonical = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        // parse attr from selector e.g. meta[name="description"] → name="description"
        const match = selector.match(/\[(\w+)="([^"]+)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Basic
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="author"]', BASE_TITLE);

    // Canonical
    setLink("canonical", canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[property="og:site_name"]', BASE_TITLE);
    setMeta('meta[property="og:locale"]', "en_US");

    // Twitter
    setMeta('meta[name="twitter:card"]', "summary_large_image");
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);
    setMeta('meta[name="twitter:site"]', "@MMNetwork");

    // JSON-LD structured data
    const existingLd = document.querySelector('script[data-seo="org"]');
    if (!existingLd) {
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-seo", "org");
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: BASE_TITLE,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.png`,
        description: "MeaningMatters Network is committed to helping individuals discover their identity, unlock their potential, and live purposeful, impactful lives.",
        sameAs: [
          "https://www.facebook.com/meaningmattersnetwork",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: `${SITE_URL}/contact`,
        },
      });
      document.head.appendChild(ld);
    }
  }, [fullTitle, description, ogImage, canonical, type]);
}
