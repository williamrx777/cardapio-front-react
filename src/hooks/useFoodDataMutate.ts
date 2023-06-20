import axios, { AxiosPromise } from "axios";
import { FoodData } from "../components/card/interface/FoodData";
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:8080/food';

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL, data);
    return response;
}

export function useFoodDataMutate(){
    const QueryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            QueryClient.invalidateQueries(['food-data'])
        }
    })

    return mutate;
}