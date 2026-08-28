import { HOME_H3 } from "@/lib/home/stage";
import { HOME_KEYWORD } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";

interface ProductMarkProps {
  product: string;
  applicationTitle: string;
  className?: string;
}

/**
 * The brand panel an expanded application entry opens with.
 *
 * It is deliberately not a picture of the product. The homepage contract admits
 * only real captures in this showcase and bans invented technical chrome, so until
 * real screenshots exist this panel says what the entry *is* in brand type rather
 * than implying a screen that nobody has shipped. When captures land, swap this for
 * the image; nothing else in the stage has to change.
 *
 * It is not a box: the stage it opens inside is one continuous field, so the mark
 * floats in that field's own light — wordmark, rule, application — with no border
 * or fill of its own.
 */
export function ProductMark({ product, applicationTitle, className }: ProductMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden px-8",
        className,
      )}
    >
      <span lang="en" className={cn(HOME_H3, "relative block")}>
        {product}
      </span>
      <span className="relative mt-5 block h-px w-16 bg-[rgb(var(--accent-rgb))]/45" />
      <span className={cn("relative mt-5 block font-body text-sm", HOME_KEYWORD)}>
        {applicationTitle}
      </span>
    </div>
  );
}
