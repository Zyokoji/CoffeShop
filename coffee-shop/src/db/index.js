import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema.js";

const dbPath = path.resolve("data/alder.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });
export { client };
