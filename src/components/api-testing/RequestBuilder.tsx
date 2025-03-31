import React from "react";
import { useDispatch } from "react-redux";
import { setResponseData } from "@/redux/apiSlice";
import { sendApiRequest } from "@/utils/apiClient";
import { AxiosResponse, AxiosError } from "axios";

interface RequestBuilderProps {
  authData: Record<string, string>;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
  apiUrl: string;
  selectedMethod: string;
  setApiUrl: (url: string) => void;
  setSelectedMethod: (method: string) => void;
}

// Type predicate to check if a response is an AxiosResponse
const isAxiosResponse = (response: any): response is AxiosResponse => {
  return response && typeof response === "object" && "status" in response && "data" in response;
};

const RequestBuilder: React.FC<RequestBuilderProps> = ({
  headers, queryParams, body, apiUrl, selectedMethod, setApiUrl, setSelectedMethod,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleSendRequest = async () => {
    if (!apiUrl) {
      console.error("API URL is required");
      return;
    }

    setLoading(true);

    try {
      // Remove Content-Type for DELETE method
      const finalHeaders = { ...headers };
      if (selectedMethod === "DELETE") {
        delete finalHeaders["Content-Type"];
      }

      const response = await sendApiRequest(selectedMethod, apiUrl, finalHeaders, queryParams, body);

      let responseData = "No Content";
      let status = "Error";
      let statusText = "";
      let responseHeaders = {};
      let config = {};

      if (isAxiosResponse(response)) {
        status = response.status.toString();
        statusText = response.statusText || "";
        responseHeaders = response.headers ? Object.fromEntries(Object.entries(response.headers)) : {};
        config = response.config ? {
          method: response.config.method,
          url: response.config.url,
          params: response.config.params,
          headers: response.config.headers ? Object.fromEntries(Object.entries(response.config.headers)) : {},
        } : {};

        if (response.status === 204) {
          responseData = "Deleted successfully";
        } else if (response.headers["content-type"]?.includes("application/json")) {
          responseData = response.data;
        }
      }

      dispatch(setResponseData({
        data: responseData,
        status,
        statusText,
        headers: responseHeaders,
        config,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("API request failed", axiosError);

      dispatch(setResponseData({
        data: axiosError.response?.data || axiosError.message || "Request failed",
        status: axiosError.response?.status?.toString() || "Error",
        statusText: axiosError.response?.statusText || "",
        headers: axiosError.response?.headers ? Object.fromEntries(Object.entries(axiosError.response.headers)) : {},
        config: {},
      }));
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        placeholder="Enter API URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
        className="border p-2 mt-2 rounded w-full"
      >
        {["GET", "POST", "PUT", "DELETE"].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button
        onClick={handleSendRequest}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </div>
  );
};

export default RequestBuilder;
