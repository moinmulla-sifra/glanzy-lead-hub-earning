import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  return { status: "Cron not fully connected to backend yet" };
});
