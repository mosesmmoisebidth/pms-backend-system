import { Router } from "express";
import AUthRoutes from "./auth.route";
import userRouter from "./user.route";
import parkingRouter from "./parking.route";
import vehiclesRouter from "./vehicle.route";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related routes
 *   - name: Users
 *     description: User management endpoints
 *   - name: Vehicles
 *     description: Vehicle registration and lookup
 *   - name: Parkings
 *     description: Parking management
 */

router.use("/auth", AUthRoutes);
router.use("/user", userRouter);
router.use("/vehicles", vehiclesRouter);
router.use("/parkings", parkingRouter);

export default router;
