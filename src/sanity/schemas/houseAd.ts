import { defineField, defineType } from "sanity";
import { AD_PLACEMENT_OPTIONS } from "@/lib/ads/config";

const COUNTRY_OPTIONS = [
  { title: "United States", value: "US" },
  { title: "United Kingdom", value: "GB" },
  { title: "Canada", value: "CA" },
  { title: "Australia", value: "AU" },
  { title: "New Zealand", value: "NZ" },
  { title: "Ireland", value: "IE" },
  { title: "Germany", value: "DE" },
  { title: "France", value: "FR" },
  { title: "Spain", value: "ES" },
  { title: "Italy", value: "IT" },
  { title: "Netherlands", value: "NL" },
  { title: "Belgium", value: "BE" },
  { title: "Sweden", value: "SE" },
  { title: "Norway", value: "NO" },
  { title: "Denmark", value: "DK" },
  { title: "Finland", value: "FI" },
  { title: "Austria", value: "AT" },
  { title: "Switzerland", value: "CH" },
  { title: "Poland", value: "PL" },
  { title: "Portugal", value: "PT" },
  { title: "India", value: "IN" },
  { title: "Singapore", value: "SG" },
  { title: "United Arab Emirates", value: "AE" },
];

export const houseAd = defineType({
  name: "houseAd",
  title: "Banner ad",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Only shown in Studio, so you can tell creatives apart.",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "active",
      title: "Live on the site",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Image description",
      type: "string",
      description: "Short description of the image for screen readers.",
      validation: (rule) => rule.required().min(3).max(140),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Where the click goes. Opens in a new tab.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "placements",
      title: "Placements",
      type: "array",
      of: [{ type: "string" }],
      options: { list: AD_PLACEMENT_OPTIONS },
      description: "Where this image is allowed to show. One ad can sit in several places.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      of: [{ type: "string" }],
      options: { list: COUNTRY_OPTIONS },
      description:
        "Leave empty to show this ad in every country. Pick countries to limit it — for example United States only. Visitors elsewhere see another ad for that placement with no countries selected, if you have one.",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: 0,
      description: "When several ads fit the same place and country, the higher number is shown.",
      validation: (rule) => rule.required().integer().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: "name",
      active: "active",
      countries: "countries",
      media: "image",
    },
    prepare({ title, active, countries, media }) {
      const list = Array.isArray(countries) ? countries.filter((code) => typeof code === "string") : [];
      const where = list.length > 0 ? list.join(", ") : "All countries";
      return {
        title: typeof title === "string" && title ? title : "Banner ad",
        subtitle: `${active === false ? "Paused" : "Live"} · ${where}`,
        media,
      };
    },
  },
});
