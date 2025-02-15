import { useQuery } from '@tanstack/react-query';
import { Api } from '../libs/api';


export const useGetGuestLocations = (guestId: string) => {
    return useQuery({
      queryKey: ['guest-locations', guestId],
      queryFn: async () => {
        const response = await Api.get(`/location/guest-locations/${guestId}`);
        console.log("Response dari API:", response.data);
        return response.data;
      },
      enabled: !!guestId,
    });
};
