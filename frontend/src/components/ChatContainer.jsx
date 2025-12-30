import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utlis.js";
import { chatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const {
    messages = [],
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
  } = useContext(chatContext);

  const { authUser, onlineUser = [] } = useContext(AuthContext);

  const scrollEnd = useRef(null);
  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
        <img src={assets.logo_icon} alt="" className="max-w-16" />
        <p className="text-lg font-medium text-white">
          Chat anytime, anywhere
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-4 py-3 px-4 border-b border-white/10 bg-black/20 backdrop-blur-md">

        {/* PERFECT CIRCLE AVATAR */}
        <div className="relative w-11 aspect-square rounded-full overflow-hidden border-2 border-violet-500 flex-shrink-0">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-full h-full object-cover"
          />

          {onlineUser.includes(selectedUser?._id) && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
          )}
        </div>

        {/* Name + Status */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">
            {selectedUser?.name}
          </p>
          <p className="text-xs text-gray-400">
            {onlineUser.includes(selectedUser?._id) ? "Online" : "Offline"}
          </p>
        </div>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer opacity-80 hover:opacity-100"
        />

        <img
          src={assets.help_icon}
          alt=""
          className="max-md:hidden w-5 opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>

      {/* ---------------- CHAT AREA ---------------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto p-3 pb-6">
        {Array.isArray(messages) &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 mb-2 ${
                msg.senderId === authUser?._id
                  ? "justify-end"
                  : "flex-row-reverse justify-end"
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] border border-gray-700 rounded-lg mb-6"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] text-sm font-light rounded-lg mb-6 break-all bg-violet-500/30 text-white ${
                    msg.senderId === authUser?._id
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <div className="text-center text-xs">
                <div className="w-7 aspect-square rounded-full overflow-hidden mx-auto">
                  <img
                    src={
                      msg.senderId === authUser?._id
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-500">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}
        <div ref={scrollEnd} />
      </div>

      {/* ---------------- INPUT AREA ---------------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSendMessage(e) : null
            }
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 bg-transparent outline-none text-white placeholder-gray-400"
          />

          <input
            type="file"
            id="image"
            accept="image/png,image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>

        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
