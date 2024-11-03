import React, { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface errorMessage{
    message: string;
}

const ErrorMessage: FC<errorMessage> = ({ message }) => {
  return (
    <div className="flex items-center px-4 py-2 mb-3 rounded border border-red-900 bg-red-900 text-red-200 shadow-md">
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

export default ErrorMessage;
