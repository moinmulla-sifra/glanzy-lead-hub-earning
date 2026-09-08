import { defineNitroPlugin } from "nitropack/runtime";
// We will import the engine here after compiling
export default defineNitroPlugin((nitroApp) => {
  console.log("Nitro cron plugin initialized");
  // setInterval(...)
});
