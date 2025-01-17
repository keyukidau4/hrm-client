import React from "react";

type Props = {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autofocus?: boolean;
  action: (e:React.ChangeEvent<HTMLInputElement>)=>void
};

const InputComponent = ({
  type,
  id,
  name,
  label,
  placeholder,
  autofocus,
  action
}: Props) => {
  return (
    <label className="text-gray-500 block mt-3">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
        onChange={e => action(e)}
      />
    </label>
  );
};

export default InputComponent;
