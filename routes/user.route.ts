import { checkAdmin, checkLoggedIn } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router()
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 */
userRouter.get("/", checkAdmin, UserController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 */
userRouter.get("/:id", checkLoggedIn, UserController.getUserById);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 */
userRouter.post("/", checkAdmin, UserController.createUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 */
userRouter.delete("/:id", checkLoggedIn, UserController.deleteUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 */
userRouter.put("/:id", UserController.updateUser); 
export default userRouter