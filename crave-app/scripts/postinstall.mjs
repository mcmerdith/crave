import { spawnSync } from "child_process";
import { join } from "path";
const os = process.platform;

const isWindows = process.platform === "win32";

console.log(
  "Patching react-native-linear-gradient to use expo-linear-gradient instead",
);

let proc;
if (isWindows) {
  const file = join(import.meta.dirname, "postinstall.bat");
  proc = spawnSync("cmd.exe", ["/c", file], { stdio: "inherit" });
} else {
  const file = join(import.meta.dirname, "postinstall.sh");
  proc = spawnSync("sh", [file], { stdio: "inherit" });
}

if (proc.error || proc.status !== 0) {
  console.error("Failed!");
  if (proc.error) console.error(proc.error);
} else {
  console.log("Success!");
}
