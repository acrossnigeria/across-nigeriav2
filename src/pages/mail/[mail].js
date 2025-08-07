import User from "@/models/User";
import db from "../../../utils/db";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";
import Close from "../../../public/images/icon/Close";
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';
import Button from "@/components/ui/Button";
import ErrorCard from "@/components/ui/ErrorCard";
import SuccessCardWithLoader from "@/components/ui/SuccessCardWithLoader";
import TextInputWithIcon from "@/components/ui/TextInputWithIcon";
import PadlockIcon from "../../../public/images/icon/PadlockIcon";
import EyeOpen from "../../../public/images/icon/EyeOpen";
import EyeClose from "../../../public/images/icon/EyeClose";
import ProcessLoader from "@/components/ui/ProcessLoader";

export default function ChangePass(props) {
    const { user, resetCodeExists } = props;
    const id = user?._id;
    const userFirstName = user?.name;
    const [ newPassword, setNewPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false); // State to toggle password visibility
    const [ showRepeatPassword, setShowRepeatPassword ] = useState(false); // State to toggle repeat password visibility
    const [ errorMessage, setErrorMessage] = useState('');
    const [ showError, setShowError ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ isloading, setIsLoading ] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility1 = () => {
      setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
      setShowRepeatPassword(!showRepeatPassword);
    }

    const handleError = (error) => {
      setShowError(true);
      setErrorMessage(error);
    }

    const handleSuccess = (message) => {
      setSuccessMessage(message);
      setShowSuccess(true);
    }

    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent the default form submission

      // Validate passwords
      if (!newPassword || !repeatPassword) {
        handleError('Both password fields are required.');
        return;
      }

      if (newPassword.length < 6 || repeatPassword.length < 6) {
        handleError('Password must be at least 6 characters long.');
        return;
      }

      if (newPassword !== repeatPassword) {
        handleError('Passwords do not match.');
        return;
      }

      // Clear any existing error messages
      setErrorMessage('');
      setShowError(false);
      setSuccessMessage(''); // Clear any existing success messages
      setShowSuccess(false);
      setShowPassword(false); // Hide password after submission
      setIsLoading(true); // Set loading state to true

      // Submit the new password to the server
      try {
        await updatePassword(newPassword, id);
        handleSuccess('Password successfully changed! redirecting to login page...');

        // timer to redirect after success
        setTimeout(() => {
          router.push('/account/login'); // Redirect to login page after successful password change
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        handleError('Failed to change password. Please try again.');
      }

      setIsLoading(false); // Reset loading state
      setNewPassword(''); // Clear the new password field
      setRepeatPassword(''); // Clear the repeat password field
    }

    const updatePassword = async (newPassword, id) => {
      if (!newPassword || !id) {
        throw new Error('New password and user ID are required.');
      }
      if (newPassword !== repeatPassword) {
        throw new Error('Passwords do not match.');
      }
      await axios.put("/api/auth/updatePass", { newPassword, id} )
    };

  return (
    <div className="flex flex-col justify-start w-screen items-center pt-[90px] h-screen relative">
      <Loader/>
      <div className='flex flex-row justify-start absolute top-[3.5%] left-[3.5%]'> 
          <Link href={'/'}><Close bg={'black'} size={'20px'}/></Link> 
      </div>
      <div className='max-width-[350px]'>
        { resetCodeExists && (
          <>
            <div className='text-center flex flex-row md:mb-10 mb-[80px] justify-center gap-1 items-center'>
              <Image src={logo1} alt='logo' placeholder='blur' className='h-[40px] w-[45px]' />
              <div className='flex flex-col justify-center leading-[15px] items-start'>
                <span className='text-[15px] font-bold text-green-700'>ACROSS NIGERIA</span>
                <span className='text-[13px] text-green-500'>REALITY SHOW</span>
              </div>
            </div>
            <div className="mb-5 flex flex-col leading-6">
              <h1 className="text-[22px] font-bold mb-2 text-center">Change password</h1>
              <span className='text-[16px] text-gray-500 text-center w-[100%]'>Please <span className="text-black">{userFirstName}</span> enter your new password below.</span>
            </div>

            <ErrorCard className={'w-full'} error={errorMessage} showError={showError} setShowError={setShowError} />
            <SuccessCardWithLoader className={'w-full'} message={successMessage} showSuccess={showSuccess}><Loader size={'10px'}/></SuccessCardWithLoader>

            {/* Form for changing password */}
            <form className="md:px-0 px-[3.5%]" onSubmit={handleSubmit}>
              <TextInputWithIcon icon={<PadlockIcon/>} value={newPassword} onChange={(e) => { setShowError(false); setNewPassword(e.target.value)}} className={'mb-4'} placeholder="New Password" label="New Password" type={showPassword ? 'text' : 'password'} id="newPassword">
                <button type="button" style={{height:'100%'}} className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                    {showPassword? <EyeOpen/>: <EyeClose/>}
                </button>
              </TextInputWithIcon>
              <TextInputWithIcon icon={<PadlockIcon/>} value={repeatPassword} onChange={(e) => { setShowError(false); setRepeatPassword(e.target.value)}} className={'mb-4'} placeholder="Repeat Password" label="Repeat Password" type={showRepeatPassword ? 'text' : 'password'} id="repeatPassword">
                <button type="button" style={{height:'100%'}} className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility2} >
                    {showRepeatPassword? <EyeOpen/>: <EyeClose/>}
                </button>
              </TextInputWithIcon>

              <Button disabled={isloading} type="submit" onClick={handleSubmit} size={"md"} className='w-[100%]'>{isloading?<ProcessLoader/>:'Change password'}</Button>
            </form>
          </>
        )}

        {!resetCodeExists && (
          <div className="text-center text-red-500 mt-[25px]">
            <h1 className="text-[20px] font-semibold mb-2">Invalid or Expired Reset Link</h1>
            <p>Please check the link you received or <Link href={'/user/password-reset'} className="font-semibold underline">request a new password reset</Link>.</p>
          </div>
        )}

      </div>
    </div>
  );

}


export async function getServerSideProps(context) {
  const { params } = context;
  const { mail } = params;
  await db.connect();
  const user = await User.findOne({resetCode:`${mail}`}).lean();
  await db.disconnect();

  if (user) {
    // If user exists, return the user data
    user.resetTime = user.resetTime ? user.resetTime.toString() : null; // Convert resetTime to string if it exists
    return {
      props: {
        user: db.convertDocToObj(user),
        resetCodeExists: true,
      },
    };
  }
  // If user does not exist, return an empty object
  return {
    props: {
      resetCodeExists: false,
      user: null, 
    },
  };
}
