import { apiRequest } from "../utility/axios";
import { getAuthToken } from "./auth";


// Interface for grouped data by month
interface GroupedMonthlyData {
  [month: string]: number; // Key is the month (e.g., "2025-01"), value is an array of daily user data
}

// Interface for the API response data structure
interface UserStatsMonthlyResponse {
  type: "month"; // Indicates the type of the data ("month" in this case)
  data: {
    groupedData: GroupedMonthlyData; // Object containing monthly grouped user data
    latestMonth: string;
    totalUsers: number;
    latestMonthCount: number;
  };
}

export const userChart = async (type: string) => {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<UserStatsMonthlyResponse>(
      `/users/user-stats?type=${type}`,
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

export const buySellChart = async (type: string):Promise<any> => {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<any>(
      `/transaction/transaction-stats?type=${type}`,
      "GET",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({response})
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const feesChart = async ():Promise<any> => {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<any>(
      `/transaction/transaction-monthly`,
      "GET",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({response})
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const LockedChart = async (type: string):Promise<any> => {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<any>(
      `/index/tvl?type=${type}`,
      "GET",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({response})
    return response.data;
  } catch (error: any) {
    throw error;
  }
};