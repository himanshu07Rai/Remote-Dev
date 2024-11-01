import { useEffect, useState } from "react";
const URL = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
export const useFetchWithAbort = (searchText: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      if(!searchText) return;
      setLoading(true);
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(`${URL}?search=${searchText}`, { signal })
        .then((response) => response.json())
        .then((data) => {
          setData(data.jobItems);
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
  
    return { data, loading, error };
  };