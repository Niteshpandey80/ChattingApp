import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-violet-700 flex items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 sm:flex-row flex-col">

        {/* LEFT */}
        <div className="flex flex-col items-center justify-center w-full sm:w-1/2 p-10 text-white">
          <img src={assets.logo_big} alt="Logo" className="w-40 drop-shadow-xl" />
          <h1 className="text-4xl font-bold mt-6 tracking-wide">Welcome Back</h1>
          <p className="text-sm mt-2 opacity-80">Start your journey with us today</p>
        </div>

        {/* RIGHT */}
        <form onSubmit={handleSubmit} className="w-full sm:w-1/2 bg-black/30 text-white p-8 flex flex-col gap-6 rounded-t-3xl sm:rounded-none sm:rounded-r-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{currState}</h2>
            <img src={assets.arrow_icon} alt="toggle" className="w-6 cursor-pointer"
              onClick={() => { setCurrState(currState === "Sign up" ? "Login" : "Sign up"); setIsDataSubmitted(false); }}
            />
          </div>

          {currState === "Sign up" && !isDataSubmitted && (
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="p-3 rounded-lg bg-white/10 border border-white/20" />
          )}

          {!isDataSubmitted && (
            <>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-lg bg-white/10 border border-white/20" />
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea rows="4" placeholder="Write a short bio..." value={bio} onChange={(e) => setBio(e.target.value)}
              className="p-3 rounded-lg bg-white/10 border border-white/20" />
          )}

          <button type="submit" className="py-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <div className="text-sm">
            {currState === "Sign up" ? (
              <p>Already have an account? <span className="cursor-pointer text-purple-300" onClick={() => setCurrState("Login")}>Login here</span></p>
            ) : (
              <p>Create an account <span className="cursor-pointer text-purple-300" onClick={() => setCurrState("Sign up")}>Click here</span></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
