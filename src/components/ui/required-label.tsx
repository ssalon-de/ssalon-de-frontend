import { Label } from "@/components/ui/label";

interface RequiredLabelProps extends React.ComponentProps<typeof Label> {
  required?: boolean;
}

export function RequiredLabel({
  required,
  children,
  ...props
}: RequiredLabelProps) {
  return (
    <div className="flex items-center space-x-1 min-h-[20px]">
      <Label {...props}>{children}</Label>
      {required && <span className="text-red-500 text-sm">*</span>}
    </div>
  );
}
