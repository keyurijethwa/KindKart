import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { createDonation, getMyDonations, getNgoRequests } from "../controllers/donorController.js";
import { getDonorRequests } from "../controllers/ngoController.js";
import { getAllUsers } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { createDonationSchema } from "../schemas/donorSchema.js";
import { updateProfileSchema } from "../schemas/profileSchema.js";

const router = Router();

// Profile API: basic info & role-specific data
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, validate(updateProfileSchema), updateProfile);

// Donor API
router.post(
  "/donor/request", 
  authenticate, 
  authorize("DONOR"), 
  validate(createDonationSchema), 
  createDonation
);
router.get("/donor/my-donations", authenticate, authorize("DONOR"), getMyDonations);
router.get("/donor/ngo-requests", authenticate, authorize("DONOR"), getNgoRequests);

// NGO API
router.get("/ngo/donor-requests", authenticate, authorize("NGO"), getDonorRequests);

// Admin API
router.get(
  "/users", 
  authenticate, 
  authorize("ADMIN"), 
  getAllUsers
);

export default router;
