import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

interface CustomFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// Regular Input Component
export const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2 bg-neutral-800 text-gray-100 border border-neutral-700 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent
        placeholder:text-gray-500"
      />
    </div>
  );
};

// Textarea Component
export const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <textarea
        {...props}
        className="w-full px-4 py-2 bg-neutral-800 text-gray-100 border border-neutral-700 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent
        placeholder:text-gray-500 min-h-[120px] resize-y"
      />
    </div>
  );
};

// File Upload Component
export const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>}
      <div className="relative">
        <input
          type="file"
          {...props}
          className="w-full px-4 py-2 bg-neutral-800 text-gray-100 border border-neutral-700 rounded-md 
          file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
          file:text-sm file:font-medium file:bg-green-600 file:text-gray-100
          hover:file:bg-indigo-700 file:cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
        />
      </div>
    </div>
  );
}; 