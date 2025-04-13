export default function ListSheet( { list }) {
    return (
        <div className="w-[100%] overflow-scroll h-[400px]">
        <div className="w-full flex flex-row text-[11px] h-[30px] gap-0.5">
            <div className="flex w-[20%] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
            <div className="flex w-[20%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Plays</div>
            <div className="flex w-[20%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Residence</div>
            <div className="flex w-[20%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Email</div>
            <div className="flex w-[20%] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Phone</div>
        </div>

        { list.length > 0 ? (
            list.map( (user, userIndex ) => {
                return (
                    <div key={user.userId} className={`w-full flex flex-row gap-0.5 text-[11px] h-[30px]`}>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[20%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[20%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.plays}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[20%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.residence}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[20%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.email}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[20%] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>+{user.phone}</div>
                    </div>
                    )
            }) 
        ) : (
            <div className="w-full text-center mt-5">No user found.</div>
        ) }
        </div> 
    )
}