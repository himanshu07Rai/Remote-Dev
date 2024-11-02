import {
    useQueries,
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
  
    export const useJobItemsByIds = (ids: number[]) => {
        const results = useQueries({
            queries: ids.map(id => ({
                queryKey: ['jobItem', id],
                queryFn: () => fetchJobItem(id),
                staleTime: 1000 * 60 * 60,
                refetchOnWindowFocus: false,
                retry: false,
                enabled: !!id,
                onError: (error: Error) => {
                  toast(error.message)
                },
            }))

        })
    //   console.log(results)
        const jobItems = results.map((result) => {
            return result.data?.jobItem
        }).filter(jobItem=>!!jobItem)

        const isLoading = results.some((result) => result.isLoading)

        return {jobItems, isLoading}
    }