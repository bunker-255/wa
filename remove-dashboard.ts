import fs from "fs";

let code = fs.readFileSync("src/App.tsx", "utf-8");

const start = code.indexOf("const DashboardView = ");
if (start !== -1) {
    const end = code.indexOf("// --- APP COMPONENT ---");
    if (end !== -1) {
        code = code.substring(0, start) + code.substring(end);
        fs.writeFileSync("src/App.tsx", code, "utf-8");
        console.log("Removed DashboardView");
    } else {
        console.log("Could not find end of DashboardView");
    }
} else {
    console.log("Could not find DashboardView");
}
