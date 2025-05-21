// controllers/parking.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";

export class ParkingController {
  // Create Parking
  public static async createParking(req: Request, res: Response) {
    try {
      const data = req.body;
      const created = await prisma.parking.create({ data });
      ServerResponse.created(res, "Parking created", created);
    } catch (err) {
      ServerResponse.error(res, "Failed to create parking", err);
    }
  }

  // Update Parking
  public static async updateParking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await prisma.parking.update({
        where: { id },
        data: req.body,
      });
      ServerResponse.success(res, "Parking updated", updated);
    } catch (err) {
      ServerResponse.error(res, "Failed to update parking", err);
    }
  }

  // Delete Parking
  public static async deleteParking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.parking.delete({ where: { id } });
      ServerResponse.success(res, "Parking deleted");
    } catch (err) {
      ServerResponse.error(res, "Failed to delete parking", err);
    }
  }

  // View all parkings
  public static async getAll(req: Request, res: Response) {
    try {
        const parkings = await prisma.parking.findMany();
        const result = await Promise.all(
        parkings.map(async (parking) => {
            const occupied = await prisma.vehicle.count({
            where: {
                parkingId: parking.id,
                exit_date: null,
            },
            });

            return {
            ...parking,
            occupied,
            vacant: parking.spaces - occupied,
            };
        })
        );
      ServerResponse.success(res, "All Parkings", result);
    } catch (err) {
      ServerResponse.error(res, "Failed to fetch parkings", err);
    }
  }

  // Get one parking
  public static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log("the id is: " + JSON.stringify(id));
      const parking = await prisma.parking.findUnique({
        where: { id },
      });

      if (!parking) {
        ServerResponse.notFound(res, "Parking not found");
        return;
      }

      const result = {
        ...parking,
      };

      ServerResponse.success(res, "Parking found", result);
    } catch (err) {
      ServerResponse.error(res, "Error getting parking", err);
    }
  }
}
