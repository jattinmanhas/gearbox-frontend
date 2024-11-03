import React, { FC } from "react";

interface successMessage {
  message: string;
}

const SuccessMessage: FC<successMessage> = ({ message }) => {
  return (
    <div className="flex items-center px-4 py-2 mb-3 rounded border border-green-900 bg-green-900 text-white shadow-md">
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
