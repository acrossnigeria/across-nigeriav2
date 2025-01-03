import User from "@/models/User";
import db from "../../../utils/db";
import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";
import Close from "../../../public/images/icon/Close";

export default function ChangePass(props){
    const { user } = props;
    const id= user._id;
    const [ newPassword, setNewPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false); // State to toggle password visibility
    const [ error, setError] = useState('');
    const router=useRouter();
    if(!user){
        return<Layout title="User Not Found">
            <div>the user with the login details you entered is not registered in our Database</div>
        </Layout>
    }
  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate passwords
    if (newPassword.length < 6 || repeatPassword.length < 6) {
      setError('Passwords must be at least 6 characters long.');
      return;
    }

    if (newPassword !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear any existing error messages
    setError('');``

    await axios.put("/api/updatePass", {newPassword,id} )
    // You can replace this with your actual submission logic
    console.log('Password successfully changed!');
    setNewPassword("");
    setRepeatPassword("");
    router.push("/account/login");
  };

  return (
    <div>
      <Loader/>
      <div className='flex flex-row justify-end px-8 py-3'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className='border-b-1 border-green-100 py-3 mt-2 text-center text-[17px] font-bold text-green-600'>
          <span>ACROSS NIGERIA REALITY SHOW</span>
        </div>
      <div className="m-5 p-5">
        <h1 className="mb-6 text-[25px]">Set new password</h1>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold" htmlFor="newPassword">Enter New Password:</label>
            <input className="mb-4 w-[100%] pl-[10px] bg-gray-200 h-[49px] rounded-[5px] text-[19px]"
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              id="newPassword"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required />
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat New Password:</label>
            <input className="mb-4 w-[100%] pl-[10px] bg-gray-200 h-[49px] rounded-[5px] text-[19px]"
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              id="repeatPassword"
              value={repeatPassword}
              placeholder="Repeat the New Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="mb-4">
            <input className=" p-3 accent-green-700" type="checkbox" id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)} />
            <label className="ml-4" htmlFor="showPassword">Show Password</label>
          </div>
          <button className="bg-green-700 hover:bg-white hover:border hover:text-green-700 rounded-[5px] h-[49px] text-white w-[100%]" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );

}


export async function getServerSideProps(context) {
  const { params, req } = context;
  const { mail } = params;
  // console.log("PARAMS", params)
  // console.log("MAIL", mail)
  await db.connect();
  const user = await User.findOne({resetCode:`${mail}`}).lean();
  await db.disconnect();
  if (user) {
    user.resetTime = user.resetTime ? user.resetTime.toISOString() : null;
  }
  return {
    props: {
      user: user ? db.convertDocToObj(user) : null, 
    },
  };
}
