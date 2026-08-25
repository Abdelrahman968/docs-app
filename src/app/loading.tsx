import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

interface loadingProps {
  label?: string;
}

const loading = ({ label = "Authenticating" }: loadingProps) => {
  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
      <Trefoil
        size="70"
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.4"
        color="black"
      />
      <span className="text-center">{label}</span>
    </div>
  );
};

export default loading;
