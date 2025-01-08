import { apiRequest } from "../utility/axios";
import { getAuthToken } from "./auth";

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

export const createIndex = async (groupIndex: IGroupCoin) => {
  const token = await getAuthToken();
  const formData = new FormData();

  // Append data to the FormData object
  formData.append("file", groupIndex.file);
  formData.append("name", groupIndex.name);
  formData.append("description", groupIndex.description);
  formData.append("faq", JSON.stringify(groupIndex.faq));
  formData.append("coins", JSON.stringify(groupIndex.coins));
  try {
    const response = await apiRequest<GetGroupCoinResponse>(
      "/index",
      "POST",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
