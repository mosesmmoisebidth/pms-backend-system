import { Router } from "express";
import AUthRoutes from "./auth.route";
import userRouter from "./user.route";
import parkingRouter from "./parking.route";
import vehiclesRouter from "./vehicle.route";

const router = Router();

// auth routes
router.use(
  "/auth",
  AUthRoutes
  /*
        #swagger.tags = ['Auth']
        #swagger.security = [] 
    */
);
router.use(
  "/user",
  userRouter
  /*
      #swagger.tags = ['Users']
      #swagger.security = [{
              "bearerAuth": []
      }] 
  */
);
 
router.use("/vehicles", vehiclesRouter
   /*
      #swagger.tags = ['Vehicles']
      #swagger.security = [{
              "bearerAuth": []
      }] 
  */
);

 
router.use("/parkings", parkingRouter
   /*
      #swagger.tags = ['Parkings']
      #swagger.security = [{
              "bearerAuth": []
      }] 
  */
);

export default router;
