import "dotenv/config";
import app from "../app.js";
import db from "./config/db.js";
import { createAdminIfNotExist } from "./seed/admin.seeder.js";

const PORT = 5000;


const startServer = async () => {
  try {
    await createAdminIfNotExist();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database error:", error);
    process.exit(1);
  }
};

startServer();
