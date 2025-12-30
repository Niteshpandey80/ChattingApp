import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { socket, authUser } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  // ✅ attach token
  useEffect(() => {
    if (authUser?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${authUser.token}`;
    }
  }, [authUser]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessage || {});
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const getMessages = async (id) => {
    try {
      const { data } = await axios.get(`/api/messages/${id}`);
      if (data.success) setMessages(data.messages);
    } catch (e) {
      setMessages([]);
      toast.error(e.message);
    }
  };

  const sendMessage = async (payload) => {
    if (!selectedUser) return;
    const { data } = await axios.post(
      `/api/messages/send/${selectedUser._id}`,
      payload
    );
    if (data.success) setMessages((p) => [...p, data.newMessage]);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (msg) => {
      if (selectedUser?._id === msg.senderId) {
        setMessages((p) => [...p, msg]);
        axios.put(`/api/messages/mark/${msg._id}`);
      } else {
        setUnseenMessages((p) => ({
          ...p,
          [msg.senderId]: (p[msg.senderId] || 0) + 1,
        }));
      }
    });

    return () => socket.off("newMessage");
  }, [socket, selectedUser]);

  return (
    <chatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
        unseenMessages,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};
// 