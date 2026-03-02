import db from "../db/index.js";

class HealthRepository {
  async SelectOne() {
    db.execute(`SELECT 1`);
  }
}

const healthRepo = new HealthRepository();
export default healthRepo;
