import { Router } from "express";
import { ParkingController } from "../controllers/parking.controller";
import { checkAdmin, checkLoggedIn } from "../middleware/auth.middleware";
// import { checkLoggedIn } from "../middleware/auth.middleware";

const parkingRouter = Router();
parkingRouter.post("/add", checkAdmin, ParkingController.createParking);
parkingRouter.get("/all", checkLoggedIn, ParkingController.getAll);
parkingRouter.get("/all/:id", checkLoggedIn, ParkingController.getOne);
parkingRouter.patch("/update/:id", checkAdmin, ParkingController.updateParking);
parkingRouter.delete("/delete/:id", checkAdmin, ParkingController.deleteParking);

export default parkingRouter;