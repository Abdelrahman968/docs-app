import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Trefoil
        size="70"
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.4"
        color="black"
      />
    </div>
  );
};

export default loading;
