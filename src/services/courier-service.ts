import axios from 'axios';
import { apiURL } from '../utils/constants';

export const fetchAllCouriers = async () => {
  const response = await axios.get(`${apiURL}/couriers`);
  return response.data.data;
};

// export const fetchCouriersById = async (courierId: string) => {
//   const response = await axios.get(`${apiURL}/couriers/${courierId}`);
//   console.log("Response data courier by id", response.data.data);

//   return response.data.data;
// };
