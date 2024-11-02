import { createContext } from "react";
import { useActiveId } from "../utils/hooks";

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

const ActiveIdContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
};

export default ActiveIdContextProvider;
