import { useContext } from "react";
import { ActiveIdContext } from "../../contexts/ActiveIdContextProvider";

export const useActiveIdContext = () => {
    const context = useContext(ActiveIdContext);
    if (!context) {
      throw new Error(
        "useActiveIdContext must be used within a ActiveIdContextProvider"
      );
    }
  
    return context;
  };