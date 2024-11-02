import {
  useQuery,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { JobItemApiResponse } from "../types";
import { BASE_URL } from "../constants";

const fetchJobItem =  async (id:number):Promise<JobItemApiResponse> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  // export const useJobItem = (id: number|null) => {
  //   const [jobItem, setJobItem] = useState<JobItemDetailsType | null>(null);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  //   useEffect(() => {
  //     if (!id) return;
  //     setLoading(true);
  //     fetch(`${BASE_URL}/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setJobItem(data.jobItem);
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //         console.error("Error:", error.message);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, [id]);
  //   return [jobItem,loading,error] as const;
  // }

  export const useJobItem = (id: number|null) => {
    const { data, isInitialLoading, isError } = useQuery(['jobItem', id],
      ()=>(id ? fetchJobItem(id):null),{
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (error: Error) => {
        toast(error.message)
      },
    });
    return { jobItem: data?.jobItem, loading: isInitialLoading, error: isError } as const;
  }