import { useState } from "react";
import axios, { AxiosError } from "axios";

const useRequest = () => {
  const [response, setResponse] = useState<any>(null); // Explicitly setting type to 'any'
  const [loading, setLoading] = useState(false);

  const sendRequest = async (
    method: string,
    url: string,
    headers: Record<string, string>,
    params: Record<string, string>,
    body: any
  ) => {
    setLoading(true);
    try {
      const res = await axios({ method, url, headers, params, data: body });
      setResponse(res.data);
    } catch (error) {
      // Type assertion: Ensure 'error' is treated as an AxiosError
      const axiosError = error as AxiosError;
      setResponse(axiosError.response ? axiosError.response.data : "Error sending request");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, sendRequest };
};

export default useRequest;
