import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";
import { JobItemsFetchApiResponse } from "../types";

// export const useFetchWithAbort = (searchText: string) => {

//     const [data, setData] = useState<JobItemType[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const totalResults = data.length
  
//     useEffect(() => {
//       if(!searchText) return;
//       setLoading(true);
//       const controller = new AbortController();
//       const signal = controller.signal;
//       fetch(`${BASE_URL}?search=${searchText}`, { signal })
//         .then((response) => response.json())
//         .then((data_) => {
//           setData(data_.jobItems);
//         })
//         .catch((error) => {
//           setError(error.message);
//           console.error("Error:", error.message);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//       return () => {
//         console.log("aborting");
//         controller.abort();
//       };
//     }, [searchText]);
//     return {data, loading, error, totalResults } as const;
//   };

const fetchJobItems = async (searchText:string):Promise<JobItemsFetchApiResponse> => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const useJobItems = (searchText: string) => {
  const {data, isInitialLoading} = useQuery(['jobItems', searchText],
    ()=>(searchText ? fetchJobItems(searchText):null),
  {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
    onError: (error: Error) => {
      toast(error.message)
    },
  }
  );

  const jobItems = data?.jobItems;


  return {jobItems, loading:isInitialLoading } as const;
};