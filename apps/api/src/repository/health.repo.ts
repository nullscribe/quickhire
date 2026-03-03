import db from "../db/index.js";

class HealthRepository {
  async SelectOne() {
    await db.execute(`SELECT 1`);
  }
}

const healthRepo = new HealthRepository();
export default healthRepo;
