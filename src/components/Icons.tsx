import moko from "@/assets/moko.svg";
import { cn } from "@/lib/utils";

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <img
      src={moko}
      alt="MolCrafts Logo"
      className={cn("w-12 h-12 object-contain rounded-lg", props.className)}
    />
  );
};
