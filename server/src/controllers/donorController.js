import { db } from "../db/db.js";
import { donations, requests, users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const createDonation = async (req, res) => {
  try {
    const donorId = req.user.id;
    const { foodType, quantity, description, expiryTime, location } = req.body;

    const [newDonation] = await db
      .insert(donations)
      .values({
        donorId,
        foodType,
        quantity,
        description,
        expiryTime: new Date(expiryTime),
        location,
        status: "PENDING",
      })
      .returning();

    // Fetch all NGOs
    const allNGOs = await db.select().from(users).where(eq(users.role, "NGO"));

    // Broadcast request to all NGOs
    if (allNGOs.length > 0) {
      const requestRecords = allNGOs.map((ngo) => ({
        donationId: newDonation.id,
        ngoId: ngo.id,
        status: "PENDING" // Assuming PENDING implies broadcasted but not yet accepted
      }));
      await db.insert(requests).values(requestRecords);
    }

    return res.status(201).json({
      message: "Donation broadcasted to all NGOs successfully.",
      donation: newDonation,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getMyDonations = async (req, res) => {
  try {
    const list = await db.select().from(donations).where(eq(donations.donorId, req.user.id));
    return res.status(200).json({ donations: list });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getNgoRequests = async (req, res) => {
  try {
    // We import ngoRequests table dynamically just to be safe if it's the first time
    const { ngoRequests } = await import("../db/schema.js");
    
    // Select all NGO requests and join to get NGO name
    const list = await db
        .select({
            id: ngoRequests.id,
            title: ngoRequests.title,
            description: ngoRequests.description,
            urgency: ngoRequests.urgency,
            quantity: ngoRequests.quantity,
            status: ngoRequests.status,
            createdAt: ngoRequests.createdAt,
            ngoName: users.name
        })
        .from(ngoRequests)
        .leftJoin(users, eq(ngoRequests.ngoId, users.id));
        
    return res.status(200).json({ requests: list });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};
