import { useEffect, useState } from "react";
import { JobItemDetailsType, JobItemType } from "./types";
import { BASE_URL } from "./constants";
export const useFetchWithAbort = (searchText: string) => {
    const [data, setData] = useState<JobItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const totalResults = data.length
  
    useEffect(() => {
      if(!searchText) return;
      setLoading(true);
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(`${BASE_URL}?search=${searchText}`, { signal })
        .then((response) => response.json())
        .then((data_) => {
          setData(data_.jobItems);
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
  
      return () => {
        console.log("aborting");
        controller.abort();
      };
    }, [searchText]);
  
    return {data, loading, error, totalResults } as const;
  };

  

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

export const useJobItem = (id: number|null) => {
  const [jobItem, setJobItem] = useState<JobItemDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setJobItem(data.jobItem);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return [jobItem, loading, error] as const
}

export const useDebounce = <T>(value: T, delay = 500):T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}