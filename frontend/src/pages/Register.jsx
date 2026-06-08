import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from '../../src/assets/pics/register.webp';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from "../../src/redux/slices/cartSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, dispatch, cart, navigate, isCheckoutRedirect]);

  const handleSendOtp = (e) => {
    e.preventDefault();

    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpGenerated);
    setOtpSent(true);

    // Print OTP to terminal
    console.log(`Generated OTP (demo): ${otpGenerated}`);

    // Alert user
    alert('OTP has been sent to your email.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    // OTP verified → proceed to register
    console.log("OTP verified. Registering user...");
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={otpSent ? handleSubmit : handleSendOtp} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Crafted Quarters</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 🐰</h2>
          <p className="text-center mb-6">
            Enter your credentials to register
          </p>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Name</label>
            <input
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Please enter your name'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Please enter your email'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Please enter your password'
            />
          </div>

          {otpSent && (
            <div className='mb-4'>
              <label className='block text-sm font-semibold mb-2'>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className='w-full p-2 border rounded text-center tracking-widest'
                placeholder='Enter the 6-digit OTP'
              />
            </div>
          )}

          <button 
            type="submit"
            className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'
          >
            {otpSent ? "Verify OTP & Register" : "Send OTP"}
          </button>

          <p className='mt-6 text-center text-sm'>
            Have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>
              Sign In
            </Link>
          </p>
        </form>
      </div>

      <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={register} alt='Register' className='h-[750px] w-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Register;
