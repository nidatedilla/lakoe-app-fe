import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../libs/api";
import {Location} from '../types/type-location'
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

export const useUpdateLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<Location, Error, Location>({
      mutationKey: ['locations'],
      mutationFn: async (location: Location) => {
        const response = await Api.patch(`/location/${location.id}`, location);
        return response.data;
      },
      onSuccess: () => {
        toast.success('Location updated successfully');
        queryClient.invalidateQueries({ queryKey: ['locations'] });
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
      onError: (error) => {
        toast.error(`Error updating location: ${error.message}`);
      },
    });
  };
  
  export const useUpdateMainLocation = () => {
    const queryClient = useQueryClient();
  
    return useMutation<
      AxiosResponse<Location>,
      Error,              
      { id: string; isMain: boolean } 
    >({
      mutationFn: async ({ id, isMain }) => {
        return await Api.patch(`/location/main-location/${id}`, { is_main_location: isMain });
      },
      onSuccess: () => {
        toast.success("Location updated successfully");
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        queryClient.invalidateQueries({ queryKey: ["locations"] });
      },
    });
  };