import setRealVH from "../../../utils/setRealVH";

const AdminMainPage = () => {
    setRealVH();
    return (
        <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="flex gap-2 justify-between p-3  flex-row">
            <div className="w-[80px] rounded-[25px] bg-green-700 border h-full">

            </div>
            <div className="flex-grow border-green-500 border h-full">

            </div>
        </div>
    )
}

export default AdminMainPage;