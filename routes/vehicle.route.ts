import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { checkAdmin, checkLoggedIn } from "../middleware/auth.middleware";

const vehiclesRouter = Router();
/**
 * @swagger
 * /vehicles/register:
 *   post:
 *     summary: Register a vehicle
 *     tags: [Vehicles]
 */
vehiclesRouter.post("/register", checkLoggedIn, VehicleController.registerVehicleEntry);

/**
 * @swagger
 * /vehicles/my-vehicles/{id}:
 *   get:
 *     summary: Get vehicles by user ID
 *     tags: [Vehicles]
 */
vehiclesRouter.get("/my-vehicles/:id", checkLoggedIn, VehicleController.getVehiclesByUser);

/**
 * @swagger
 * /vehicles/exit/{plate_number}:
 *   patch:
 *     summary: Exit a vehicle using plate number
 *     tags: [Vehicles]
 */
vehiclesRouter.patch("/exit/:plate_number", checkLoggedIn, VehicleController.exitVehicle);

/**
 * @swagger
 * /vehicles/all:
 *   get:
 *     summary: Get all vehicles (admin only)
 *     tags: [Vehicles]
 */
vehiclesRouter.get("/all", checkAdmin, VehicleController.getAllVehicles);
export default vehiclesRouter;
