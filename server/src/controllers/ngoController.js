import { db } from "../db/db.js";
import { donations, users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getDonorRequests = async (req, res) => {
  try {
    const list = await db
      .select({
        id: donations.id,
        foodType: donations.foodType,
        quantity: donations.quantity,
        description: donations.description,
        expiryTime: donations.expiryTime,
        location: donations.location,
        status: donations.status,
        createdAt: donations.createdAt,
        donorName: users.name,
      })
      .from(donations)
      .leftJoin(users, eq(donations.donorId, users.id));

    return res.status(200).json({ requests: list });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};
