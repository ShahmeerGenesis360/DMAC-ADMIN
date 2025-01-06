import { apiRequest } from "../utility/axios";
import { getAuthToken } from "./auth";

interface IWalletResponse {
  data: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    users: IWallet[] | [];
  };
  status: boolean;
}

interface IProps {
  page: number;
  search?: string;
}

export const getAllWallet = async ({ page, search }: IProps) => {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<IWalletResponse>(
      `/users/all?page=${page}&search=${search}`,
      "GET",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
