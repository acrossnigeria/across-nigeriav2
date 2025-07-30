const NumberInputWithIcon = ({ value, setChange, label, className, children }) => {
    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if ( !isNaN(value) && value >= 1 ) {
            setChange(value);
        }
    }

    const decrease = () => {
        if ( value > 1 ) {
            setChange(value-1);
        }
    }

    const increase = () => {
        setChange(value+1);
    }

    return (
        <div className={`${className}`}>
            <label htmlFor="email" className="text-[16px] ml-1">{label}</label>
            <div className="flex flex-row items-center mt-1 justify-center gap-2 focus-within:border-green-500 transition-all border-gray-400 border-[0.5px] h-[50px] outline-green-500 rounded-[5px] p-2 px-3 w-full">
                <input
                    type={"number"}
                    value={value}
                    onChange={handleChange}
                    inputMode="numeric"
                    min={1}
                    pattern="[0-9]*"
                    className="flex-grow flex-1 border-0 text-[16px] h-[100%] px-3 rounded-[5px] outline-none bg-transparent pl-2"
                />
                <div className="w-fit flex flex-row gap-1">
                    <button onClick={decrease} className="border-green-500 text-[21px] text-green-950 border-1 rounded-[2px] bg-green-300 hover:bg-green-400 h-[35px] w-[35px]">-</button>
                    <button onClick={increase} className="border-green-500 text-[21px] text-green-950 border-1 rounded-[2px] bg-green-300 hover:bg-green-400 h-[35px] w-[35px]">+</button>
                </div>
                {children}
            </div>
        </div>
  );
}

export default NumberInputWithIcon;