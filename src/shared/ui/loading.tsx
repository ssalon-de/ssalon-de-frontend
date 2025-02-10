import Spinner from "@/shared/ui/spinner";

const Loading = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
