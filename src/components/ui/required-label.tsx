import { Label } from "@/components/ui/label";

interface RequiredLabelProps extends React.ComponentProps<typeof Label> {
  required?: boolean;
  errorMessage?: string;
}

export function RequiredLabel({
  required,
  children,
  errorMessage,
  ...props
}: RequiredLabelProps) {
  return (
    <div className="flex items-center space-x-1 min-h-[20px]">
      <Label {...props}>{children}</Label>
      {required && <span className="text-red-500 text-sm">*</span>}
      {errorMessage && (
        <span className="text-red-700 text-[9px]">{errorMessage}</span>
      )}
    </div>
  );
}
