export type SeoImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
};

export type StructuredData = Record<string, unknown>;

export type SeoConfig = {
  siteName: string;
  siteUrl: string;
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  author: string;
  publisher: string;
  language: string;
  locale: string;
  themeColor: string;
  robots: {
    index: boolean;
    follow: boolean;
    content: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    type: string;
    locale: string;
    images: SeoImage[];
  };
  twitter: {
    card: "summary" | "summary_large_image" | "app" | "player";
    site: string;
    creator: string;
  };
  structuredData: StructuredData;
};

const siteUrl = "https://meucomercial.com.br/";
const defaultDescription =
  "Transforme TVs em canais de comunicação e vendas com mídia indoor em nuvem, gestão remota, agendamento e implantação plug-and-play.";
const defaultOgImage = `${siteUrl}og-image.png`;
const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const webApplicationId = `${siteUrl}#web-application`;
const serviceId = `${siteUrl}#service`;

export const seoConfig: SeoConfig = {
  siteName: "Meu Comercial",
  siteUrl,
  title: "Meu Comercial | TV Corporativa e Mídia Indoor em Nuvem",
  titleTemplate: "%s | Meu Comercial",
  description: defaultDescription,
  keywords: [
    "Meu Comercial",
    "TV corporativa",
    "mídia indoor",
    "midia indoor",
    "sinalização digital",
    "sinalizacao digital",
    "digital signage",
    "software para TV corporativa",
    "gestão de telas",
    "gestao de telas",
    "comunicação interna",
    "comunicacao interna",
    "agendamento de campanhas",
    "TV para ponto de venda",
    "mural digital"
  ],
  author: "Meu Comercial LTDA",
  publisher: "Meu Comercial",
  language: "pt-BR",
  locale: "pt_BR",
  themeColor: "#0066cc",
  robots: {
    index: true,
    follow: true,
    content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  openGraph: {
    title: "Meu Comercial | TV Corporativa e Mídia Indoor em Nuvem",
    description: defaultDescription,
    url: siteUrl,
    siteName: "Meu Comercial",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Meu Comercial - plataforma de TV corporativa e mídia indoor em nuvem",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    creator: ""
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Meu Comercial",
        legalName: "Meu Comercial LTDA",
        url: siteUrl,
        logo: `${siteUrl}android-chrome-512x512.png`,
        image: defaultOgImage,
        email: "comercial@meucomercial.com.br",
        telephone: "+55-62-99196-2033",
        areaServed: {
          "@type": "Country",
          name: "Brasil"
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+55-62-99196-2033",
            contactType: "sales",
            areaServed: "BR",
            availableLanguage: ["pt-BR"]
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "Meu Comercial",
        description: defaultDescription,
        inLanguage: "pt-BR",
        publisher: {
          "@id": organizationId
        }
      },
      {
        "@type": "WebApplication",
        "@id": webApplicationId,
        name: "Meu Comercial",
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android TV, Smart TV",
        browserRequirements: "Requires JavaScript. Requires Internet connection.",
        description: defaultDescription,
        inLanguage: "pt-BR",
        image: defaultOgImage,
        publisher: {
          "@id": organizationId
        },
        offers: {
          "@type": "Offer",
          price: "35.00",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}#planos`
        }
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "TV Corporativa e Mídia Indoor em Nuvem",
        serviceType: "Sinalização digital, TV corporativa e mídia indoor",
        provider: {
          "@id": organizationId
        },
        areaServed: {
          "@type": "Country",
          name: "Brasil"
        },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Empresas, varejo, clínicas, academias, escritórios e redes com múltiplas telas"
        },
        url: siteUrl,
        description: defaultDescription
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: siteUrl
          }
        ]
      }
    ]
  }
};

export const toAbsoluteUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) return seoConfig.siteUrl;

  try {
    return new URL(pathOrUrl, seoConfig.siteUrl).toString();
  } catch {
    return seoConfig.siteUrl;
  }
};
