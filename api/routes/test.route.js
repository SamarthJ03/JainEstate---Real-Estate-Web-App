import express from "express"
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
// import { updateUser } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn)
// router.put("/:id",verifyToken,updateUser);
router.get("/should-be-admin",shouldBeAdmin)

export default router;