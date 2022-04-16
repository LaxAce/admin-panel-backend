import express from "express";
import { 
    getAllUsers,
    updateUser,
    updateManyUsers, 
    deleteUsers 
} from "../controller/users.js";

const router = express.Router();

router.route("/")
.get(getAllUsers)
.patch(updateManyUsers)
.delete(deleteUsers)

router.route("/:id").patch(updateUser);

export default router
