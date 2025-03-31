import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ResponseViewer: React.FC = () => {
  const { response } = useSelector((state: RootState) => state.api);

  return (
    <div className="p-4 bg-gray-100 shadow rounded-lg">
      <h2 className="font-bold">Response</h2>
      {response ? (
        <pre className="bg-white p-2 border rounded overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      ) : (
        <p>No response yet.</p>
      )}
    </div>
  );
};

export default ResponseViewer;
