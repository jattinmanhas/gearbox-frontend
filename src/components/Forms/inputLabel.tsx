import React, { useRef, useState } from 'react'

type inputLabel = {
    labelName: string;
    inputId: string;
    placeholder: string;
    type: string;
    className?: string;
}

export default function InputLabel({labelName, inputId, placeholder, type, className }: inputLabel) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleFileDelete = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="m-2" htmlFor={inputId}>
        {labelName}: <span className="text-red-800">*</span>
      </label>
      {type === 'file' ? (
        <>
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="block p-2 bg-green-50 border focus:outline-green-800 rounded-lg mb-4 flex-1 text-sm font-semibold text-green-700 hover:bg-green-100"
          >
            {placeholder}
          </button>
          {files.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-4">
              {files.map(file => (
                <div key={file.name} className="flex flex-col items-center">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="max-w-full h-auto rounded-lg" />
                  <span className="text-sm text-green-700 mt-2">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleFileDelete(file.name)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            id={inputId}
            type="file"
            name={inputId}
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </>
      ) : (
        <input
          id={inputId}
          type={type}
          name={inputId}
          className="block p-2 bg-neutral-800 border focus:outline-green-800 rounded-lg mb-4 flex-1"
          placeholder={placeholder}
          autoComplete="off"
          {...(type === 'number' && { min: "0" })}
        />
      )}
    </div>
  );
}
