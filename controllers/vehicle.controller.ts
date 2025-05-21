import { NextFunction, Response, Request } from "express";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";
import { Server } from "http";

export class VehicleController {
  // Register Vehicle Entry
  public static async registerVehicleEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const { plate_number, parking_code } = req.body;
      console.log("the parking code is: "+ JSON.stringify(parking_code));

      if (!plate_number || !parking_code) {
        ServerResponse.error(res, "Unprocessable entity", null);
        return;
      }

      const parking = await prisma.parking.findUnique({
        where: { code: parking_code },
      });

      if (!parking) {
        ServerResponse.notFound(res, "Parking with this code does not exist");
        return;
      }

      if (parking.spaces <= 0) {
        ServerResponse.error(res, "No available space in this parking lot", null);
        return;
      }

      // Register vehicle
      const vehicle = await prisma.vehicle.create({
        data: {
          plate_number,
          parkingId: parking.id,
          userId: req.user?.id as string,
          charged_amount: parking.charging_fee,
        },
      });

      // Generate ticket number
      const ticketNumber = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;

      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber,
          bookingId: vehicle.id,
          entryTime: new Date(),
          exitTime: new Date(),
          totalAmount: 0,
          paymentStatus: "UNPAID",
          paymentMethod: "PENDING",
          paymentReference: "N/A",
          taxAmount: 0,
          duration: 0,
          subtotal: 0,
          issuedBy: 'Park Wise',
          userId: req.user?.id as string,
          vehicleId: vehicle.id,
        },
      });

      // Update parking space
      await prisma.parking.update({
        where: { id: parking.id },
        data: {
          spaces: parking.spaces - 1,
        },
      });

      ServerResponse.success(res, "Vehicle entry registered successfully", {
        vehicle,
        ticket,
        parkingDetails: {
          parkingName: parking.parking_name,
          location: parking.location,
          chargingFeePerHour: parking.charging_fee,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getAllVehicles(req: Request, res: Response, next: NextFunction){
    try{
      const vehicles = await prisma.vehicle.findMany({
        where: { status: "PARKING"},
        include: {
          parking: true,
          tickets: true
        }
      });
      ServerResponse.success(res, "All vehicles", vehicles);
    }catch(error){
      next(error);
    }
  }

  // Get vehicles for the current user
  public static async getVehiclesByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      const vehicles = await prisma.vehicle.findMany({
        where: { userId, status: "PARKING" },
        include: {
          parking: true,
          tickets: true,
        },
      });

      ServerResponse.success(res, "Vehicles registered by the user", vehicles);
    } catch (error) {
      next(error);
    }
  }

  // Exit a vehicle (remove and update space)
  public static async exitVehicle(req: Request, res: Response, next: NextFunction) {
  try {
    const { plate_number } = req.params;

    console.log("the plate number is: " + JSON.stringify(plate_number));

    const vehicle = await prisma.vehicle.findUnique({
      where: { plate_number },
      include: { parking: true }, // include parking to access fee
    });

    if (!vehicle) {
      ServerResponse.notFound(res, "Vehicle not found");
      return;
    }

    // Get the related ticket
    const ticket = await prisma.ticket.findFirst({
      where: { vehicleId: vehicle.id },
    });

    if (!ticket) {
      ServerResponse.notFound(res, "Ticket not found for vehicle");
      return;
    }

    const exitTime = new Date();
    const entryTime = new Date(ticket.entryTime);
    const durationInMs = exitTime.getTime() - entryTime.getTime();
    const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60)); // round up to full hour

    const feePerHour = vehicle.parking.charging_fee;
    const subtotal = durationInHours * feePerHour;

    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        exitTime: exitTime,
        duration: durationInHours,
        totalAmount: subtotal,
        subtotal: subtotal,
        paymentStatus: "UNPAID",
        paymentMethod: "PENDING",
        paymentReference: "N/A",
        taxAmount: 0,
      },
    });

    // Delete vehicle
    await prisma.vehicle.update({
      where: { plate_number },
      data: {
        status: "OUTSIDE"
      }
    });

    // Increment available spaces in parking
    await prisma.parking.update({
      where: { id: vehicle.parkingId },
      data: {
        spaces: {
          increment: 1,
        },
      },
    });

    ServerResponse.success(res, "Vehicle exited, ticket updated", updatedTicket);
  } catch (error) {
    next(error);
  }
}

}
