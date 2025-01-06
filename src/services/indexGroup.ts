import { apiRequest } from "../utility/axios";

export interface GetGroupCoinResponse {
  data: IGroupCoin[] | [];
  message?: string;
  status: boolean;
}

export const getAllIndex = async () => {
  try {
    const response = await apiRequest<GetGroupCoinResponse>("/index", "GET");
    return response;
  } catch (error: any) {
    throw error;
  }
};
