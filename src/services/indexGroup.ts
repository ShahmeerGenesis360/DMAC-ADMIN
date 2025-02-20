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

export const getAllIndexWithPagination = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<any> => {
  const token = await getAuthToken();
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search,
  }).toString();

  try {
    const response = await apiRequest<any>(
      `/index/admin?${queryParams}`,
      "GET",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const createIndex = async (groupIndex: IGroupCoin) => {
  const token = await getAuthToken();
  const formData = new FormData();

  console.log("-----------------------------------");
  console.log(groupIndex, "groupIndex")
  // Append data to the FormData object
  formData.append("imageUrl", groupIndex.imageUri);
  formData.append("name", groupIndex.name);
  formData.append("symbol", groupIndex.symbol);
  formData.append("description", groupIndex.description);
  formData.append("category", groupIndex.category);
  formData.append("faq", JSON.stringify(groupIndex.faq));
  formData.append("coins", JSON.stringify(groupIndex.coins));
  formData.append(
    "mintKeySecret",
    JSON.stringify(groupIndex.mintKeySecret.toString())
  );
  formData.append(
    "mintPublickey",
    JSON.stringify(groupIndex.mintPublickey.toString())
  );
  formData.append(
    "tokenAllocations",
    JSON.stringify(groupIndex.tokenAllocations)
  );
  formData.append(
    "collectorDetailApi",
    JSON.stringify(groupIndex.collectorDetailApi)
  );
  formData.append(
    "pda",
    JSON.stringify(groupIndex.IndexPda.toString())
  );
  console.log(groupIndex.feeAmount)
  formData.append("feeAmount", JSON.stringify(groupIndex.feeAmount));
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    console.log("calling the API now");
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
    console.log("-------------             -----------------");
    console.log(response.data);
    return response;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const updateIndex = async (groupIndex: IGroupCoin) => {
  const token = await getAuthToken();
  
  const payload = {
    name: groupIndex.name,
    symbol: groupIndex.symbol,
    id: groupIndex._id as string,
    description: groupIndex.description,
    category: groupIndex.category,
    faq: groupIndex.faq,
    coins: groupIndex.coins,
    collectorDetails: groupIndex.collectorDetail,
    imageUrl: groupIndex.imageUrl || undefined,
  };

  try {
    const response = await apiRequest<GetGroupCoinResponse>(
      `/index/${groupIndex._id}`,
      "PUT",
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

