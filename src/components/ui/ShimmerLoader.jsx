const ShimmerLoader = ( { height, width, roundedness, className } ) => {
    return (
        <div style={{height:height, width:width, borderRadius:roundedness }} className={`relative overflow-hidden rounded-[30px] bg-gray-300 ${className} `}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
    )
}

export default ShimmerLoader;