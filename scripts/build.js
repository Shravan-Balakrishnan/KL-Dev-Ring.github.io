import fs from "node:fs/promises";
import path from "node:path";
import { buildNetwork, readMembers, ROOT, validateMember } from "./lib.js";

const out = path.join(ROOT, "dist");
const publicDir = path.join(ROOT, "public");
const members = await readMembers();
const handles = members.map((member) => member.handle);
const errors = members.flatMap((member) => validateMember(member, handles).map((error) => `${member.__file}: ${error}`));
if (errors.length) throw new Error(errors.join("\n"));

await fs.rm(out, { recursive: true, force: true });
await fs.cp(publicDir, out, { recursive: true });
await fs.mkdir(path.join(out, "data"), { recursive: true });
await fs.mkdir(path.join(out, "builders"), { recursive: true });

const network = buildNetwork(members.map(({ __file, ...member }) => member));
await fs.writeFile(path.join(out, "data", "network.json"), JSON.stringify(network, null, 2));

const profileShell = await fs.readFile(path.join(publicDir, "profile.html"), "utf8");
for (const member of network.nodes) {
  const dir = path.join(out, "builders", member.handle);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), profileShell
    .replaceAll("{{HANDLE}}", member.handle)
    .replaceAll("{{NAME}}", member.name)
    .replaceAll("{{BIO}}", member.bio));
}
await fs.rm(path.join(out, "profile.html"));
console.log(`Built ${network.nodes.length} profiles and network data in dist/.`);
