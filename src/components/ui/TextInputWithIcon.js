const TextInputWithIcon = ({ icon, placeholder, value, onChange, label, className, children, type }) => {
  return (
    <div className={`${className}`}>
        <label htmlFor="email" className="text-[16px] ml-1">{label}</label>
        <div className="flex flex-row items-center mt-1 justify-center gap-2 focus-within:border-green-500 transition-all border-gray-400 border-[0.5px] h-[50px] outline-green-500 rounded-[5px] p-2 w-full">
          <div className="">
              { icon }
          </div>
          <input
              type={type || 'text'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="flex-grow flex-1 border-0 text-[16px] h-[100%] px-3 rounded-[3px] outline-none bg-transparent pl-2"
          />
          {children}
      </div>
    </div>
  );
}

export default TextInputWithIcon;