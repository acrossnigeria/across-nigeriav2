import LikeIcon from "../../public/images/icon/LikeIcon";

const CommentCard = ( { likes, name, text })=> {
    return (
        <div className="flex my-1 flex-row justify-between items-start gap-2">
            <div className="flex flex-row justify-between gap-2">
                <span className="text-[16px] font-bold">{name}</span>
                <span>{text}</span>  
            </div>
            
            <button className="flex flex-col items-center"><LikeIcon color={'black'} size={'14px'}/>{likes}</button>
        </div>
    )
}

export default CommentCard;