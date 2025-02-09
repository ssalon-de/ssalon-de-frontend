import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
