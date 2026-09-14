import { z } from "zod";

const applyBodySchema = z
  .object({
    slug: z.string().min(1),
  })
  .strict();

const sanityOverrideSchema = z.object({
  _type: z.literal("calculatorSeoOverride").optional(),
  slug: z.string().min(1),
});

/** Accepts `{ slug }` or a Sanity calculatorSeoOverride webhook body. */
export function slugFromRevalidatePayload(body: unknown): string | null {
  const apply = applyBodySchema.safeParse(body);
  if (apply.success) return apply.data.slug;

  const sanity = sanityOverrideSchema.safeParse(body);
  if (sanity.success) return sanity.data.slug;

  return null;
}
