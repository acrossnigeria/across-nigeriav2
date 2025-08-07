const TextAreaInput = ({ placeholder, value, onChange, label, className, children, height }) => {
  return (
    <div className={`${className}`}>
        <label htmlFor="email" className="text-[16px] ml-1">{label}</label>
        <div className="flex flex-row items-center justify-center gap-2 focus-within:border-green-500 transition-all border-gray-400 border-[0.5px] h-full outline-green-500 rounded-[5px] p-2 w-full">
          <textarea
              type={'text'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="w-full h-[120px] border-0 text-[16px] px-2 rounded-[3px] outline-none bg-transparent"
          />
          {children}
      </div>
    </div>
  );
}

export default TextAreaInput;