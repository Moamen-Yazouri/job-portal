import React from "react";
import type { TCats } from "~/@types";

interface IProps {
    label: string,
    options: TCats[] | string[]
    name: string
    defaultValue?: string;
}
function SelectField({name, label, options, defaultValue }: IProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
     
        <select name={name} defaultValue={defaultValue} className="border border-gray-300 rounded-md p-2 pr-8 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full hover:border-blue-400 transition-all">
          {options.map((opt, idx) => (
            <option key={idx}>{opt}</option>
          ))}
        </select>

      </div>
    
  );
}

export default SelectField;
