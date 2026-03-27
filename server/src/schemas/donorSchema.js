import { z } from "zod";

export const createDonationSchema = z.object({
  foodType: z.string({ required_error: "Food type is required" }),
  quantity: z.string({ required_error: "Quantity is required" }),
  description: z.string().optional(),
  expiryTime: z.string({ required_error: "Expiry time is required" }), // expected ISO string
  location: z.string({ required_error: "Location is required" }),
});
