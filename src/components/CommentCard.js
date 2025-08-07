import LikeIcon from "../../public/images/icon/LikeIcon";

const CommentCard = ( { comment })=> {
    function formatDateToTimeAgo(date) {
        const now = new Date();
        const createdAt = new Date(date);
        const diffInSeconds = Math.floor( (now - createdAt) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}secs ago`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}mins ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds /3600);
            return `${hours}hrs ago`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds /86400);
            return `${days}day/s ago`;
        } else {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months}month/s ago`;
        }
    }
    return (
        <div className="flex my-1 flex-row justify-between items-start gap-2">
            <div className="flex flex-row justify-between max-w-[80%] gap-2">
                <span className="text-[15px] font-bold">{comment.user.name}</span>
                <span className="text-[15px] flex flex-col">{comment.text} <span className={`${!(comment._id==='temp') ? 'hidden':''} text-[13px] font-light text-gray-500`}>Posting... </span></span>  
            </div>
            <span className="flex flex-row justify-center flex-wrap items-center text-[10px]">{ comment._id==='temp'?'Just now':formatDateToTimeAgo(comment.createdAt)}</span>
        </div>
    )
}

export default CommentCard;