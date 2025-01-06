import { apiRequest } from "../utility/axios";

interface IAdminResponse {
  token: string;
}

export const loginAdmin = async (credential: IAdmin) => {
  try {
    const response = await apiRequest<IAdminResponse>("/auth/login", "POST", {
      ...credential,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
