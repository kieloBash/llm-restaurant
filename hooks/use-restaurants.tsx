import { FoursquarePlace } from "@/types/foursquare-place";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const queryKey = "restaurants";

const fetchData = async (message: string): Promise<FoursquarePlace[]> => {
    const response = await axios.post("/api/execute", { message }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    return response.data;
}

function useRestaurants(search: string) {
    const { data, error, isLoading, isFetching, isError } = useQuery<FoursquarePlace[]>({
        queryKey: [queryKey, search],
        queryFn: () => fetchData(search),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: search != ""
    });

    return {
        data,
        error,
        isLoading,
        isFetching,
        isError,
    };
};

export { useRestaurants };