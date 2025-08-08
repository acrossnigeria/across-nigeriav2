const Button = ({ children, onClick, className = '', type = 'button', size, disabled = false, bg }) => {
    const sizeClasses = {
        "sm": 'text-sm px-2 py-1',
        "md": 'text-base px-4 py-2',
        "lg": 'text-lg px-6 py-3',
    };
  return (
    <button
      type={type}
      onClick={disabled?()=>{}:onClick}
      className={`${ disabled?'bg-gray-400' : bg ? bg :`bg-green-600 hover:bg-green-700` } text-white ${sizeClasses[size]} rounded-[3px] flex flex-row justify-center items-center transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;