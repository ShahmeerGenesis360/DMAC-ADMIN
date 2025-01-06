export const login = async (token: string) => {
  localStorage.setItem("auth-token", token);
};

export const getAuthToken = async (): Promise<string> => {
  return localStorage.getItem("auth-token") || "";
};
export const logout = async () => {
  localStorage.removeItem("auth-token");
};
