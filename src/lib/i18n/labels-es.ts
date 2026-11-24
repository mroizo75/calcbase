import type { ResultCardLabels } from "@/components/calculator/result-card";

/**
 * Neutral Latin-American Spanish (es-419) UI strings shared by all /es/ pages.
 * No pricing, return or legal claims live here; only interface wording and the
 * standard "informational only" disclaimer (translation of the English one).
 */
export const ES_RESULT_CARD_LABELS: Partial<ResultCardLabels> = {
  calculationResult: "Resultado del cálculo",
  result: "Resultado",
  csvLabel: "Concepto",
  csvValue: "Valor",
  copyLink: "Copiar enlace",
  linkCopied: "Enlace copiado",
  downloadPdf: "Descargar PDF",
  share: "Compartir",
  shareAria: "Compartir cálculo",
  copied: "Copiado",
  pdf: "PDF",
  pdfAria: "Guardar como PDF",
  csv: "CSV",
  csvAria: "Descargar CSV",
  copy: "Copiar",
  copyAria: "Copiar resultado",
  formulaUsed: "Fórmula utilizada:",
  pdfGeneratedBy: "Generado por CalcBase",
  pdfDescription: "Concepto",
  pdfValue: "Valor",
  pdfFormula: "Fórmula",
  pdfDisclaimer:
    "Este documento es solo informativo y no sustituye el asesoramiento financiero, fiscal o legal profesional.",
  dateLocale: "es-419",
  htmlLang: "es-419",
};

export const ES_SECTION_HEADINGS = {
  formula: "Fórmula",
  examples: "Ejemplos resueltos",
  faq: "Preguntas frecuentes",
  related: "Calculadoras relacionadas",
  allCalculators: "Ver todas las calculadoras",
} as const;

export const ES_CHROME = {
  home: "Inicio",
  homeAria: "Ruta de navegación",
  calculators: "Calculadoras",
  logoAlt: "CalcBase – Calculadoras de precios y negocios",
  footerTagline:
    "Herramientas de precios para vendedores en línea y profesionales independientes.",
  footerCalculators: "Calculadoras",
  footerCompany: "Empresa",
  footerCompanyLinks: [
    { label: "Acerca de (en inglés)", href: "/about" },
    { label: "Contacto (en inglés)", href: "/contact" },
    { label: "Política de privacidad (en inglés)", href: "/privacy-policy" },
    { label: "Términos del servicio (en inglés)", href: "/terms" },
  ],
  cookieSettings: "Configuración de cookies",
  disclaimer:
    "Todos los cálculos son solo informativos y no sustituyen el asesoramiento financiero, fiscal o legal profesional. Consulta siempre a un profesional calificado antes de tomar decisiones que afecten tus finanzas o tu negocio.",
  footerDisclaimer:
    "Todos los cálculos son solo informativos y no sustituyen el asesoramiento financiero, fiscal o legal profesional.",
  readInEnglish: "Read this page in English",
  languageSwitchAria: "Cambiar idioma",
} as const;

export const ES_COOKIE_COPY = {
  ariaLabel: "Consentimiento de cookies",
  text: "Usamos cookies para mostrar anuncios relevantes mediante Google AdSense y para entender cómo se usa el sitio. Las cookies esenciales siempre están activas. Las cookies publicitarias solo se activan con tu consentimiento.",
  privacyLabel: "Política de privacidad (en inglés)",
  reject: "Rechazar todas",
  accept: "Aceptar todas",
} as const;
