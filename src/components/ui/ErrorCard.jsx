import Close from "../../../public/images/icon/Close"

const ErrorCard = ({ error, showError, setShowError, className }) => {
  return (
        <>
        { showError && (
            <div className={`bg-red-50 text-red-700 p-2 rounded-[5px] mb-3 ${className}`}>
                <div className="flex flex-row justify-between items-start">
                    <div className="flex flex-row items-center">
                        <span className="text-[14px]">{error}</span>  
                    </div>  
                    <button type="button" onClick={() => setShowError(false)} className="text-red-500 hover:text-red-700"> 
                        <Close size={'10px'} bg={'red'}/>
                    </button>
                </div>
            </div>
        )}
        </>
  );
}

export default ErrorCard;
// this component displays an error message card with a close button.
// It takes in three props: error (the error message to display), showError (a boolean to control visibility), and setShowError (a function to update the visibility state).