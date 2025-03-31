import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearResponseHistory } from "@/redux/apiSlice";

const HistoryLogs: React.FC = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.api.responseHistory);

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h3 className="font-bold mb-2">Request & Response History</h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500">No history available</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="p-2 bg-white border rounded shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{item.config.method?.toUpperCase()}</span>
                <span className="truncate w-2/3 text-blue-500">{item.config.url}</span>
              </div>
              <p className="text-gray-600 text-sm">Status: {item.status} - {item.statusText}</p>
              <pre className="bg-gray-100 p-2 text-xs rounded">{JSON.stringify(item.data, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
      
      <button 
        onClick={() => dispatch(clearResponseHistory())}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear History
      </button>
    </div>
  );
};

export default HistoryLogs;
