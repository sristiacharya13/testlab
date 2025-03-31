import React from "react";

interface Props {
  body: string;
  setBody: (body: string) => void;
}

const BodyInput: React.FC<Props> = ({ body, setBody }) => {
  return (
    <div>
      <h3 className="font-bold">Body</h3>
      <textarea
        placeholder="Enter JSON body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2 rounded h-32"
      />
    </div>
  );
};

export default BodyInput;
