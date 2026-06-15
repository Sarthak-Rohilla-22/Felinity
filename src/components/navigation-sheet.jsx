import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavMenu } from "@/components/nav-menu";
import LogoSmall from "../assets/FelinitySmallLogo.png";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-[#EDE4D8] hover:bg-[#EDE4D8]"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#FAF7F0] px-6 py-8">
        <div className="flex justify-center mb-8">
          <img src={LogoSmall} alt="Felinity" className="h-16 w-auto" />
        </div>
        <NavMenu className="mt-6 [&>div]:h-full" orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
};
