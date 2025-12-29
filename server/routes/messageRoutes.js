import express from 'express' ; 
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen } from '../controllers/messageControllers.js';
const messageRoter = express.Router();

messageRoter.get('/users' , protectRoute , getUsersForSidebar)
messageRoter.get("/:id" , protectRoute , getMessages)
messageRoter.put("mark/:id" , protectRoute , markMessageAsSeen);

export default messageRoter ;