import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = { fullName: name, bio };

      if (selectedImg) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
          payload.profilePic = reader.result;
          await updateProfile(payload);
          navigate("/");
        };
      } else {
        await updateProfile(payload);
        navigate("/");
      }
    } catch (err) {
      console.error("Profile Update Failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-11/12 max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row gap-10 text-white">

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>

          <label className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition">
            <input type="file" accept=".png,.jpg,.jpeg" hidden onChange={handleImageChange} />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
              alt="profile"
              className="w-16 h-16 object-cover border border-white/30 shadow-md rounded-full"
            />
            <span>Upload Profile Image</span>
          </label>

          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-white/20 outline-none border border-white/30 focus:ring-2 focus:ring-purple-400" />

          <textarea rows="4" placeholder="Write your bio..." value={bio} onChange={(e) => setBio(e.target.value)}
            className="p-3 rounded-lg bg-white/20 outline-none border border-white/30 focus:ring-2 focus:ring-purple-400" />

          <button type="submit" className="py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:scale-105 transition font-medium">
            Save Changes
          </button>
        </form>

        <div className="flex flex-col items-center text-center bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg flex-1">
          <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
            alt="preview"
            className="w-28 h-28 rounded-full border border-white/30 object-cover shadow-lg" />
          <h3 className="text-xl font-semibold mt-4">{name}</h3>
          <p className="text-sm opacity-80 mt-2">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
