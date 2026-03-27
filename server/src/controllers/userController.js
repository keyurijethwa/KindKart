import { db } from "../db/db.js";
import { users } from "../db/schema.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        phone: users.phone,
        address: users.address,
        createdAt: users.createdAt,
      })
      .from(users);

    return res.status(200).json({
      message: "Users fetched successfully.",
      totalUsers: allUsers.length,
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};
