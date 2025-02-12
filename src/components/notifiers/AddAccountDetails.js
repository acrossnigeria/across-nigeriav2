export default function AddAccDetails( { closeFunction, state }) {
    return (
        <div className="h-screen flex flex-col items-center pt-[10%] w-screen z-[3000] bg-black/10 backdrop-blur-[1px] top-0 fixed">
            <div className="bg-gray-100 flex flex-col p-4 text-center items-center rounded-[15px] md:w-[500px] w-[95%]">
                <span className="text-[19px] font-bold">Receive Your Winnings Securely</span>
                <div>
                    <span>To receive payments for your winnings, please add your bank account details. Your information is kept safe and used only for payouts.</span>
                </div>
                <div className="flex flex-row items-center mt-[15px] justify-around gap-3">
                    <button onClick={()=>{closeFunction(!state)}} className="text-[18px] h-[45px]">Remind Me later</button>
                    <button className="text-[18px] text-white px-[15px] bg-green-500 rounded-[30px] h-[45px]">Add Bank Details</button>
                </div>
            </div>
        </div>
    )
}