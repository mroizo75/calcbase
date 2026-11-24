interface FormulaBlockProps {
  formula: string;
  explanation: string;
  /** Optional heading override (Spanish pages). Default: "Formula". */
  heading?: string;
}

export function FormulaBlock({ formula, explanation, heading = "Formula" }: FormulaBlockProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-semibold">{heading}</h2>
      <div className="rounded-lg border bg-muted/50 p-4">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {formula}
        </pre>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {explanation}
      </p>
    </section>
  );
}
