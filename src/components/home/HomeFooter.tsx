import { BrandCopy, BrandName } from "@/components/BrandName";
import { useHomeCopy } from "@/lib/home/copy";
import { GITHUB_ORG_HREF } from "@/lib/home/data";
import { Github } from "lucide-react";
import { LogoIcon } from "../Icons";

/**
 * The homepage's own footer.
 *
 * `App.tsx` suppresses the shared `Footer` on `/` because this one is art-directed
 * for the dark homepage. It is rendered as a sibling of the blocks rather than
 * inside the last one: a `footer` nested in a `section` loses its implicit
 * `contentinfo` role, which left the page with no such landmark at all.
 */
export function HomeFooter() {
  const { footer } = useHomeCopy();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 px-6 py-5 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon className="!h-9 !w-9" />
          <BrandName className="font-display text-xl font-semibold" />
        </div>
        <p className="max-w-lg font-body text-sm leading-6 text-muted-foreground md:text-right">
          {footer.tagline}
        </p>
      </div>
      <div className="mx-auto mt-4 flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-3 font-body text-xs text-muted-foreground">
        <span>
          © {year} <BrandCopy text="MolCrafts" /> · {footer.credit}
        </span>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB_ORG_HREF}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center gap-2 text-muted-foreground no-underline hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {footer.github}
          </a>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center font-normal text-muted-foreground no-underline hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
          >
            {footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
