const fs = require("fs");
let content = fs.readFileSync("src/components/SettingsView.tsx", "utf8");

// The file likely has:
// import { useState, useEffect } from "react";
// import { useMonetization } from "@/lib/useMonetization";
// import { useNavigate } from "@tanstack/react-router";
// ... later ...
// import { Link, useNavigate } from "@tanstack/react-router";

content = content.replace(
  'import { useNavigate } from "@tanstack/react-router";\n',
  "",
);
fs.writeFileSync("src/components/SettingsView.tsx", content);
