import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="animate-spin text-olivia">
      <Loader className="w-10 h-10" />
    </div>
  );
};

export default Loading;
