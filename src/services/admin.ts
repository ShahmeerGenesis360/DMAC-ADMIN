import { toast } from "react-toastify";
import { apiRequest } from "../utility/axios";

interface IAdminResponse {
  token: string;
  message: string;
}

export const loginAdmin = async (credential: IAdmin) => {
  try {
    const response = await apiRequest<IAdminResponse>("/auth/login", "POST", {
      ...credential,
    });
    toast.success(response.message)
    return response;
  } catch (error: any) {
    toast.error(error.message)
    console.log("err", error.message)
    throw error;
  }
};
