import axios, { AxiosError } from "axios";

export const sendApiRequest = async (
  method: string,
  url: string,
  headers: Record<string, string>,
  params: Record<string, string>,
  body: any
) => {
  try {
    const response = await axios({ method, url, headers, params, data: body });
    return response;
  } catch (error) {
    // Ensure error is treated as an AxiosError
    const axiosError = error as AxiosError;
    return axiosError.response || { status: "Error", data: axiosError.message };
  }
};
