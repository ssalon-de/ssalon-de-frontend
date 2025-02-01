import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

type Props = {
  onMenuToggle: () => void;
};

export function MobileHeader({ onMenuToggle }: Props) {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b md:hidden h-[70px] z-50">
      <Logo />
      <Button variant="ghost" size="icon" onClick={onMenuToggle}>
        <Menu className="h-6 w-6" />
      </Button>
    </header>
  );
}
