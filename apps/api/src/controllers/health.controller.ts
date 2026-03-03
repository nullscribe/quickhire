import type { Request, Response } from "express";
import healthRepo from "../repository/health.repo.js";

export async function handleHealthCheck(_req: Request, res: Response) {
  const startTime = performance.now();
  try {
    await healthRepo.SelectOne();
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    res.json({ status: "healthy", responseTime: `${responseTime.toFixed(2)}ms` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "unhealthy" });
  }
}
