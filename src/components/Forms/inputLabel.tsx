import React from 'react'

type inputLabel = {
    labelName: string;
    inputId: string;
    placeholder: string;
    type: string;
}

export default function InputLabel({labelName, inputId, placeholder, type }: inputLabel) {
  return (
    <div className="flex flex-col mt-3">
      <label className="m-2" htmlFor="category_name">
        {labelName}: <span className="text-red-800">*</span>
      </label>
      <input
        id={inputId}
        type={type}
        name={inputId}
        className="block p-2 bg-neutral-800 border focus:outline-green-800 rounded-lg mb-4 flex-1"
        placeholder={placeholder}
        autoComplete="off"
         {...(type === 'number' && { min: "0" })}
      />
    </div>
  );
}
