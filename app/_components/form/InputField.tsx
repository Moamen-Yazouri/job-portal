import React from "react";
interface IProps {
    label: string,
    placeholder: string
    name: string,
    defaultValue?: string
}
function InputField({ label, placeholder, name, defaultValue }: IProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />
    </div>
  );
}

export default InputField;
