export default function ListSheet2( { list }) {
    return (
        <div className="md:w-fit overflow-x-scroll">
        <div className="w-full flex flex-row text-[13px] h-[40px] gap-0.5">
            <div className="flex w-[140px] flex-row bg-gray-500 text-white justify-start items-center pl-1">Fullname</div>
            <div className="flex w-[90px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Referrals</div>
            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Institution</div>
            <div className="flex w-[200px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Email</div>
            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Phone</div>
            <div className="flex w-[90px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1"> Residence</div>
            <div className="flex w-[140px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Town/ village/ community</div>
            <div className="flex w-[90px] overflow-x-hidden flex-row bg-gray-500 text-white justify-start items-center pl-1">Status</div>
        </div>

        { list.length > 0 ? (
            list.map( (user, userIndex ) => {
                return (
                    <div key={user.userId} className={`w-full flex flex-row gap-0.5 text-[13px] h-[40px]`}>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.fullname}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[90px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.refs}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.orgName}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[200px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.email}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>+{user.phone}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[90px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}> {user.residence}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[140px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.city}</div>
                        <div className={`${(userIndex+1)%2===0?'bg-gray-300':'bg-gray-200'} flex w-[90px] overflow-x-hidden flex-row mt-1 text-black justify-start items-center pl-1`}>{user.status}</div>
                    </div>
                    )
            }) 
        ) : (
            <div className="w-full text-center mt-5">No user found.</div>
        ) }
        </div> 
    )
}