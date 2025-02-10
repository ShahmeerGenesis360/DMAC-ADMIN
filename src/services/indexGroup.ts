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

  const payload = {
    name: groupIndex.name,
    symbol: groupIndex.symbol,
    description: groupIndex.description,
    category: groupIndex.category,
    faq: groupIndex.faq,
    coins: groupIndex.coins,
    mintKeySecret: groupIndex.mintKeySecret.toString(),
    mintPublickey: groupIndex.mintPublickey.toString(),
    tokenAllocations: groupIndex.tokenAllocations,
    collectorDetailApi: groupIndex.collectorDetailApi,
    feeAmount: groupIndex.feeAmount,
    imageUrl: groupIndex.imageUrl,
  };

  try {
    const response = await apiRequest<GetGroupCoinResponse>(
      "/index",
      "POST",
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

