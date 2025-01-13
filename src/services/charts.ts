import { apiRequest } from "../utility/axios";
import { getAuthToken } from "./auth";

interface UserStatsResponse {
  data: {
    labels: string[]; // Array of labels (e.g., days, weeks, months)
    counts: number[]; // Array of counts corresponding to the labels
  };
}

// Interface for a single day's user count
interface DailyUserData {
  day: number; // Day of the month
  count: number; // Count of users on that day
}

// Interface for grouped data by month
interface GroupedMonthlyData {
  [month: string]: DailyUserData[]; // Key is the month (e.g., "2025-01"), value is an array of daily user data
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
