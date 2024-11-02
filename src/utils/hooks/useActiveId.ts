import { useEffect, useState } from 'react';

export const useActiveId = ()=>{
    const [activeId, setActiveId] = useState<number | null>(null);
    const handleHashChange = () => {
      const id = parseInt(window.location.hash.slice(1));
     setActiveId(id)
    };
    useEffect(() => {
      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);
    return activeId;
  }
  