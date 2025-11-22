import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("admin1234", 12);
console.log(hash);
