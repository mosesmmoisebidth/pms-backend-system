import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { checkAdmin, checkLoggedIn } from "../middleware/auth.middleware";

const vehiclesRouter = Router();
vehiclesRouter.post("/register", checkLoggedIn, VehicleController.registerVehicleEntry);
vehiclesRouter.get("/my-vehicles/:id", checkLoggedIn, VehicleController.getVehiclesByUser);
vehiclesRouter.patch("/exit/:plate_number", checkLoggedIn, VehicleController.exitVehicle);
vehiclesRouter.get("/all", checkAdmin, VehicleController.getAllVehicles);
export default vehiclesRouter;
