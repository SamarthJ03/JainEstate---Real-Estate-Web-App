import express from "express";
import { deleteUser, getUser, getUsers, getNotificationNumber} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
import { updateUser, savePost, profilePosts } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/",getUsers)
// router.get("/:id",verifyToken,getUser)
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)
router.post("/save",verifyToken,savePost)
router.get("/profilePosts",verifyToken, profilePosts)
router.get("/notification",verifyToken, getNotificationNumber)
export default router;