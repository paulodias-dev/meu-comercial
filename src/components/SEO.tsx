import {useEffect} from "react";
import {seoConfig, toAbsoluteUrl, type StructuredData} from "../seo.config";

type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

type LinkTag = {
  rel: string;
  href: string;
  hreflang?: string;
  type?: string;
  sizes?: string;
  as?: string;
  crossOrigin?: string;
};

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: string;
  robots?: string;
  author?: string;
  themeColor?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: StructuredData | StructuredData[];
  additionalMetaTags?: MetaTag[];
  additionalLinkTags?: LinkTag[];
};

const managedDynamicSelector = "[data-seo-dynamic='true']";
const emptyMetaTags: MetaTag[] = [];
const emptyLinkTags: LinkTag[] = [];

const resolveTitle = (title?: string) => {
  if (!title) return seoConfig.title;
  return seoConfig.titleTemplate.replace("%s", title);
};

const setMetaTag = (attribute: "name" | "property", key: string, content?: string) => {
  if (!content) return;

  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
  element.dataset.seoManaged = "true";
};

const setLinkTag = ({rel, href, ...attributes}: LinkTag) => {
  if (!href) return;

  const normalizedHref = rel === "canonical" || rel === "alternate" ? toAbsoluteUrl(href) : href;
  let selector = `link[rel="${rel}"]`;
  if (attributes.hreflang) selector += `[hreflang="${attributes.hreflang}"]`;
  if (attributes.sizes) selector += `[sizes="${attributes.sizes}"]`;

  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", normalizedHref);
  Object.entries(attributes).forEach(([key, value]) => {
    if (!value) return;
    const attributeName = key === "crossOrigin" ? "crossorigin" : key;
    element?.setAttribute(attributeName, value);
  });
  element.dataset.seoManaged = "true";
};

const setJsonLd = (structuredData: StructuredData | StructuredData[]) => {
  const elementId = "seo-jsonld";
  let element = document.head.querySelector<HTMLScriptElement>(`#${elementId}`);

  if (!element) {
    element = document.createElement("script");
    element.id = elementId;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(structuredData);
  element.dataset.seoManaged = "true";
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  imageAlt,
  url,
  type,
  robots,
  author,
  themeColor,
  publishedTime,
  modifiedTime,
  structuredData,
  additionalMetaTags = emptyMetaTags,
  additionalLinkTags = emptyLinkTags
}: SEOProps) {
  useEffect(() => {
    document.head.querySelectorAll(managedDynamicSelector).forEach((element) => element.remove());

    const resolvedTitle = resolveTitle(title);
    const resolvedDescription = description || seoConfig.description;
    const resolvedUrl = toAbsoluteUrl(url || seoConfig.openGraph.url);
    const defaultImage = seoConfig.openGraph.images[0];
    const resolvedImage = toAbsoluteUrl(image || defaultImage.url);
    const resolvedImageAlt = imageAlt || defaultImage.alt;
    const resolvedType = type || seoConfig.openGraph.type;
    const resolvedKeywords = keywords?.length ? keywords : seoConfig.keywords;
    const resolvedRobots = robots || seoConfig.robots.content;
    const resolvedAuthor = author || seoConfig.author;
    const resolvedThemeColor = themeColor || seoConfig.themeColor;

    document.documentElement.lang = seoConfig.language;
    document.title = resolvedTitle;

    setMetaTag("name", "viewport", "width=device-width, initial-scale=1.0");
    setMetaTag("name", "description", resolvedDescription);
    setMetaTag("name", "keywords", resolvedKeywords.join(", "));
    setMetaTag("name", "author", resolvedAuthor);
    setMetaTag("name", "robots", resolvedRobots);
    setMetaTag("name", "googlebot", resolvedRobots);
    setMetaTag("name", "theme-color", resolvedThemeColor);
    setMetaTag("name", "color-scheme", "light");

    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDescription);
    setMetaTag("property", "og:url", resolvedUrl);
    setMetaTag("property", "og:type", resolvedType);
    setMetaTag("property", "og:site_name", seoConfig.openGraph.siteName);
    setMetaTag("property", "og:locale", seoConfig.openGraph.locale);
    setMetaTag("property", "og:image", resolvedImage);
    setMetaTag("property", "og:image:secure_url", resolvedImage);
    setMetaTag("property", "og:image:type", defaultImage.type);
    setMetaTag("property", "og:image:width", String(defaultImage.width));
    setMetaTag("property", "og:image:height", String(defaultImage.height));
    setMetaTag("property", "og:image:alt", resolvedImageAlt);

    if (publishedTime) setMetaTag("property", "article:published_time", publishedTime);
    if (modifiedTime) setMetaTag("property", "article:modified_time", modifiedTime);

    setMetaTag("name", "twitter:card", seoConfig.twitter.card);
    setMetaTag("name", "twitter:title", resolvedTitle);
    setMetaTag("name", "twitter:description", resolvedDescription);
    setMetaTag("name", "twitter:image", resolvedImage);
    setMetaTag("name", "twitter:image:alt", resolvedImageAlt);
    setMetaTag("name", "twitter:url", resolvedUrl);
    if (seoConfig.twitter.site) setMetaTag("name", "twitter:site", seoConfig.twitter.site);
    if (seoConfig.twitter.creator) setMetaTag("name", "twitter:creator", seoConfig.twitter.creator);

    setLinkTag({rel: "canonical", href: resolvedUrl});
    setLinkTag({rel: "alternate", hreflang: "pt-BR", href: resolvedUrl});
    setLinkTag({rel: "alternate", hreflang: "x-default", href: seoConfig.siteUrl});

    additionalMetaTags.forEach((metaTag) => {
      const element = document.createElement("meta");
      if (metaTag.name) element.setAttribute("name", metaTag.name);
      if (metaTag.property) element.setAttribute("property", metaTag.property);
      element.setAttribute("content", metaTag.content);
      element.dataset.seoDynamic = "true";
      document.head.appendChild(element);
    });

    additionalLinkTags.forEach((linkTag) => {
      const element = document.createElement("link");
      element.setAttribute("rel", linkTag.rel);
      element.setAttribute("href", linkTag.href);
      if (linkTag.hreflang) element.setAttribute("hreflang", linkTag.hreflang);
      if (linkTag.type) element.setAttribute("type", linkTag.type);
      if (linkTag.sizes) element.setAttribute("sizes", linkTag.sizes);
      if (linkTag.as) element.setAttribute("as", linkTag.as);
      if (linkTag.crossOrigin) element.setAttribute("crossorigin", linkTag.crossOrigin);
      element.dataset.seoDynamic = "true";
      document.head.appendChild(element);
    });

    setJsonLd(structuredData || seoConfig.structuredData);
  }, [
    additionalLinkTags,
    additionalMetaTags,
    author,
    description,
    image,
    imageAlt,
    keywords,
    modifiedTime,
    publishedTime,
    robots,
    structuredData,
    themeColor,
    title,
    type,
    url
  ]);

  return null;
}
