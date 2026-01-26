import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: object;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes("SolvePro") ? title : `${title} | SolvePro`;
  const siteUrl = "https://solvepro.app";

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMeta("description", description);
    if (keywords) updateMeta("keywords", keywords);
    updateMeta("author", "SolvePro");
    
    // Robots
    if (noIndex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      updateMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    }

    // Open Graph
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:site_name", "SolvePro", true);
    if (canonicalUrl) {
      updateMeta("og:url", `${siteUrl}${canonicalUrl}`, true);
    }

    // Twitter Card
    updateMeta("twitter:card", twitterCard);
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);
    updateMeta("twitter:site", "@SolvePro");
    updateMeta("twitter:creator", "@SolvePro");

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${siteUrl}${canonicalUrl}`;
    } else if (canonical) {
      canonical.remove();
    }

    // Structured Data (JSON-LD)
    const existingScript = document.querySelector("script[data-seo='structured-data']");
    if (existingScript) existingScript.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "structured-data");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup structured data on unmount
      const script = document.querySelector("script[data-seo='structured-data']");
      if (script) script.remove();
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, structuredData, noIndex]);

  return null;
}

// Pre-built structured data templates
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SolvePro",
  url: "https://solvepro.app",
  logo: "https://solvepro.app/logo.png",
  sameAs: [
    "https://twitter.com/SolvePro",
    "https://linkedin.com/company/solvepro",
    "https://github.com/solvepro"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-SOLVE",
    contactType: "customer service",
    availableLanguage: "English"
  }
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SolvePro",
  url: "https://solvepro.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://solvepro.app/trainers?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Expert Problem Solving",
  provider: {
    "@type": "Organization",
    name: "SolvePro"
  },
  description: "Connect with verified experts to solve problems in any domain - technology, business, design, and more.",
  serviceType: "Consulting",
  areaServed: "Worldwide"
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://solvepro.app${item.url}`
  }))
});
