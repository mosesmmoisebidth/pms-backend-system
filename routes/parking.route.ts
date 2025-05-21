import { Router } from "express";
import { ParkingController } from "../controllers/parking.controller";
import { checkAdmin, checkLoggedIn } from "../middleware/auth.middleware";
// import { checkLoggedIn } from "../middleware/auth.middleware";

const parkingRouter = Router();
/**
 * @swagger
 * /parkings/add:
 *   post:
 *     summary: Add a new parking
 *     tags: [Parkings]
 */
parkingRouter.post("/add", checkAdmin, ParkingController.createParking);

/**
 * @swagger
 * /parkings/all:
 *   get:
 *     summary: Get all parkings
 *     tags: [Parkings]
 */
parkingRouter.get("/all", checkLoggedIn, ParkingController.getAll);

/**
 * @swagger
 * /parkings/all/{id}:
 *   get:
 *     summary: Get a parking by ID
 *     tags: [Parkings]
 */
parkingRouter.get("/all/:id", checkLoggedIn, ParkingController.getOne);

/**
 * @swagger
 * /parkings/update/{id}:
 *   patch:
 *     summary: Update a parking by ID
 *     tags: [Parkings]
 */
parkingRouter.patch("/update/:id", checkAdmin, ParkingController.updateParking);

/**
 * @swagger
 * /parkings/delete/{id}:
 *   delete:
 *     summary: Delete a parking by ID
 *     tags: [Parkings]
 */
parkingRouter.delete("/delete/:id", checkAdmin, ParkingController.deleteParking);
export default parkingRouter;