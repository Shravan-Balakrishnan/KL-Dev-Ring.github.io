import { readMembers, validateMember } from "./lib.js";

const members = await readMembers();
const handles = members.map((member) => member.handle);
let failures = 0;

for (const member of members) {
  const errors = validateMember(member, handles);
  if (errors.length) {
    failures++;
    console.error(`\n${member.__file}`);
    errors.forEach((error) => console.error(`  - ${error}`));
  }
}

if (failures) {
  console.error(`\nValidation failed for ${failures} member file(s).`);
  process.exit(1);
}
console.log(`Validated ${members.length} member files.`);
