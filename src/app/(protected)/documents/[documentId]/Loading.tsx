import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <DotPulse size="43" speed="1.3" color="black" />;{" "}
      <span className="text-center">Loading Document</span>
    </div>
  );
};

export default Loading;
