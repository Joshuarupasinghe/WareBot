import React from "react";

const TextField = ({ label, placeholder, type = "text", ...props }) => {
  return (
    <div className="w-full flex flex-col text-left">
      <label className="text-sm text-white mb-1">{label}</label>

      <div className="rounded-xl p-[1px] bg-gradient-to-r from-[#5653FE] to-[#8B5CF6]">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-[#151D30] text-white placeholder:text-gray-400 focus:outline-none"
          {...props}
        />
      </div>
    </div>
  );
};

export default TextField;
