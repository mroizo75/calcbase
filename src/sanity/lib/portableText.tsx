import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?.url as string | undefined;
      if (!url) return null;
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value?.alt || ""}
            width={1200}
            height={675}
            className="h-auto w-full rounded-lg"
          />
          {value?.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-20 text-2xl font-bold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-mt-20 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-semibold text-foreground">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target={value?.blank ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground [&>li]:pl-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-muted-foreground [&>li]:pl-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};
