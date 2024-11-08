import React from 'react'

type textAreaLabel = {
  labelName: string;
  textareaId: string;
  placeholder: string;
};


export default function TextareaLabel({labelName, textareaId, placeholder}: textAreaLabel) {
  return (
    <div className="flex flex-col mt-3">
      <label className="m-2" htmlFor="category_description">
        {labelName}: <span className="text-red-800">*</span>
      </label>
      <textarea
        id={textareaId}
        name={textareaId}
        className="block p-2 bg-neutral-800 border focus:outline-green-800 rounded-lg mb-4 flex-1"
        placeholder={placeholder}
        autoComplete="off"
      ></textarea>
    </div>
  );
}
