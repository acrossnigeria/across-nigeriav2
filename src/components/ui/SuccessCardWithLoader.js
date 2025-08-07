import ProcessLoader from "./ProcessLoader";

const SuccessCardWithLoader = ({ message, showSuccess, className }) => {
  return (
        <>
        { showSuccess && (
            <div className={`bg-green-100 border-[0.5px] border-green-500 text-black p-2 rounded-[5px] mb-3 ${className}`}>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-[14px]">{message}</span>
                    </div>  
                    <ProcessLoader size={'20px'}/>
                </div>
            </div>
        )}
        </>
  );
}

export default SuccessCardWithLoader;
// This component displays a success message card with a check icon.
// It takes in three props: message (the success message to display), showSuccess (a boolean to control visibility), and className (for additional styling).