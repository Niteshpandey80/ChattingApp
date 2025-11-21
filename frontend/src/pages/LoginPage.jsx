import React, { useState } from 'react';
import assets from '../assets/assets';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-violet-700 flex items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 sm:flex-row flex-col">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 p-10 text-white">
          <img src={assets.logo_big} alt="Logo" className="w-40 drop-shadow-xl" />
          <h1 className="text-4xl font-bold mt-6 tracking-wide">Welcome Back</h1>
          <p className="text-sm mt-2 opacity-80">Start your journey with us today</p>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/2 bg-black/30 text-white p-8 flex flex-col gap-6 rounded-t-3xl sm:rounded-none sm:rounded-r-3xl"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{currState}</h2>
            <img
              src={assets.arrow_icon}
              onClick={() => {
                setCurrState(currState === "Sign up" ? "Login" : "Sign up");
                setIsDataSubmitted(false);
              }}
              alt="toggle"
              className="w-6 cursor-pointer hover:scale-110 transition"
            />
          </div>

          {currState === "Sign up" && !isDataSubmitted && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              rows="4"
              placeholder="Write a short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-purple-400 outline-none"
            ></textarea>
          )}

          <button
            type="submit"
            className="py-3 mt-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg hover:opacity-90 transition font-medium"
          >
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <label className="flex items-center gap-2 text-sm opacity-90 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            Agree to the Terms of Use & Privacy Policy
          </label>
          <div className='flex flex-col gap-2'> {
            currState === "Sign up" ? (
              <p className='text-sm text-white' >Already have an account ? <span onClick={()=>{setCurrState("Login")}}  className='font-medium text-[#A043F7] cursor-pointer'>Login here</span></p>
            ): (
               <p className='text-sm text-white'>Create an account <span onClick={()=>setCurrState("Sign up")} className='font-medium text-[#A043F7] cursor-pointer'>Click here</span> </p>
            )}</div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;