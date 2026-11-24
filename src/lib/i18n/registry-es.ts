import type { CalculatorConfig } from "@/lib/calculators/types";

/**
 * Spanish (es-419, neutral Latin-American Spanish) content for the calculators.
 *
 * One entry per calculator, keyed by the same slug as the English registry.
 * The page lives at /es/<slug>; `seo.canonical` is therefore "/es/<slug>".
 *
 * Editorial rules (agreed with Kenneth, 23.11.2026):
 *  - Additive only: the English registry is never touched.
 *  - No claims about prices, returns or legal matters beyond what the English
 *    page already says. Industry benchmark figures are deliberately NOT
 *    translated; they await Kenneth's approval.
 *  - Examples use "$" with US-style numbers (1,234.50). The Spanish input
 *    parser accepts both "1,234.50" and "1.234,50".
 */
export const esCalculators: CalculatorConfig[] = [
  {
    slug: "profit-calculator",
    title: "Calculadora de ganancias",
    shortDescription:
      "Calcula la ganancia, el precio de venta y los márgenes a partir del costo y los ingresos. Tres modos de cálculo.",
    longDescription: `La ganancia es lo que queda de tus ingresos después de restar los costos. Esta calculadora no se queda en una sola cifra: te muestra al mismo tiempo la ganancia, el margen y el markup de cualquier venta o línea de productos, para que veas el panorama completo antes de fijar un precio.

Hay tres modos de cálculo. Si conoces el costo y los ingresos, obtienes la ganancia, el margen y el markup. Si conoces el costo y quieres alcanzar un margen concreto, la calculadora te da el precio de venta y el markup resultante. Si prefieres pensar en markup, indica el costo y el porcentaje que quieres añadir y obtendrás el precio de venta y el margen correspondiente.

Ganancia, margen y markup suelen confundirse, y esa confusión lleva a errores de precios. La ganancia es un monto en dinero. El margen es la ganancia como porcentaje de los ingresos (del precio de venta). El markup es la ganancia como porcentaje del costo. Una misma venta produce tres números distintos; aquí los ves juntos y con su nombre, así siempre sabes cuál estás usando.`,
    category: "pricing",
    relatedSlugs: [],
    defaultInputs: { cost: 60, revenue: 100, mode: "fromRevenue" },
    formula:
      "Ganancia = Ingresos − Costo\nMargen % = (Ganancia ÷ Ingresos) × 100\nMarkup % = (Ganancia ÷ Costo) × 100",
    formulaExplanation:
      "La ganancia es la diferencia entre el precio al que vendes y lo que te cuesta. El margen expresa esa ganancia como porcentaje de los ingresos; el markup la expresa como porcentaje del costo. Ambos describen la misma ganancia desde puntos de vista distintos.",
    examples: [
      {
        title: "Margen en una venta de $100 con un costo de $60",
        description: "Un producto que cuesta $60 producir se vende en $100.",
        inputs: { Costo: "$60", Ingresos: "$100" },
        result: "Ganancia = $40. Margen = 40%. Markup = 66.67%.",
      },
      {
        title: "Precio de venta a partir de un margen objetivo del 30%",
        description: "Un producto cuesta $50 y necesitas un margen del 30%.",
        inputs: { Costo: "$50", "Margen objetivo": "30%" },
        result: "Precio de venta = $71.43. Ganancia = $21.43.",
      },
    ],
    faq: [
      {
        question: "¿Cómo se calcula la ganancia?",
        answer:
          "Resta el costo total de los ingresos totales. Si vendes un producto en $100 y producirlo y entregarlo cuesta $60, tu ganancia bruta es de $40. La ganancia neta resta además los demás gastos del negocio (gastos generales, impuestos, intereses). Esta calculadora se centra en la ganancia bruta.",
      },
      {
        question: "¿Cuál es la diferencia entre ganancia bruta y ganancia neta?",
        answer:
          "La ganancia bruta son los ingresos menos el costo directo de lo vendido (materiales, mano de obra directa, producción). La ganancia neta resta a la ganancia bruta todos los demás gastos: alquiler, sueldos, publicidad, impuestos e intereses. Un negocio puede tener una buena ganancia bruta y una ganancia neta baja o negativa si sus gastos generales son altos. Esta calculadora muestra la ganancia bruta.",
      },
      {
        question: "¿Cómo encuentro el precio de venta a partir de un margen objetivo?",
        answer:
          "Divide el costo entre (1 − margen en decimal). Para un margen del 30% sobre un costo de $50: $50 ÷ 0.70 = $71.43 de precio de venta. Esta fórmula es clave cuando tienes un margen mínimo que cumplir: fija el precio correcto en lugar de aplicar un markup y esperar que el margen salga bien.",
      },
      {
        question: "¿La ganancia es lo mismo que el margen?",
        answer:
          "No. La ganancia es un monto en dinero (por ejemplo, $40). El margen es esa ganancia expresada como porcentaje de los ingresos (por ejemplo, 40%). Un margen alto en una venta pequeña puede dejar menos ganancia total que un margen bajo en una venta grande. Importan los dos: el margen indica qué tan eficiente es cada venta y la ganancia total indica el resultado real.",
      },
      {
        question: "¿Cuál es la diferencia entre margen y markup?",
        answer:
          "Ambos parten de la misma ganancia, pero se miden sobre bases distintas. El margen se calcula sobre el precio de venta y el markup se calcula sobre el costo. Con un costo de $60 y un precio de $100, la ganancia es $40: el margen es 40% y el markup es 66.67%. Un markup del 50% no equivale a un margen del 50%.",
      },
      {
        question: "¿Qué es un buen margen de ganancia bruta?",
        answer:
          "Depende del sector, del modelo de negocio y de los costos fijos que tengas que cubrir, así que no existe una cifra válida para todos. Compara tu margen con el de negocios similares al tuyo y revisa cómo cambia cuando varían tus costos o tus descuentos.",
      },
      {
        question: "¿Cómo puedo mejorar mi margen de ganancia?",
        answer:
          "Hay dos palancas: aumentar los ingresos manteniendo los costos, o reducir los costos manteniendo los ingresos. En la práctica significa ajustar precios, negociar con los proveedores, mejorar los procesos, aumentar el valor promedio de cada pedido o dejar de vender productos con margen muy bajo. Usa esta calculadora para probar el efecto de cada cambio antes de aplicarlo.",
      },
    ],
    seo: {
      title: "Calculadora de ganancias: margen y markup gratis | CalcBase",
      description:
        "Calculadora de ganancias gratis: ingresa el costo y el precio y obtén la ganancia, el margen y el markup. O define un margen objetivo y calcula el precio de venta.",
      canonical: "/es/profit-calculator",
    },
    keywords: [
      "calculadora de ganancias",
      "calculadora de margen de ganancia",
      "cómo calcular la ganancia",
      "calcular precio de venta con margen",
      "fórmula de ganancia",
      "calculadora de markup",
      "margen y markup diferencia",
    ],
  },
];

export const ES_CALCULATOR_SLUGS = esCalculators.map((c) => c.slug);

export function getEsCalculator(slug: string): CalculatorConfig | undefined {
  return esCalculators.find((c) => c.slug === slug);
}
