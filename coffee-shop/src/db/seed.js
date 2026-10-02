import { count } from "drizzle-orm";
import { client, db } from "./index.js";
import { jobs, menuItems } from "./schema.js";

export const menuSeed = [
  {
    slug: "house-latte",
    name: "House Latte",
    category: "Espresso",
    price: 4.5,
    blurb: "Smooth milk, balanced roast, easy to drink every morning.",
    details:
      "Our house espresso pulled short, then stretched with steamed milk. Soft sweetness, low bitterness, and a finish that stays friendly.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    category: "Espresso",
    price: 4.25,
    blurb: "Thick foam, short and cozy. A classic for a reason.",
    details:
      "Equal parts espresso, steamed milk, and foam. Compact, warm, and perfect when you want something smaller than a latte.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    slug: "americano",
    name: "Americano",
    category: "Espresso",
    price: 3.5,
    blurb: "Clean and simple. Espresso opened up with hot water.",
    details:
      "Two shots of espresso with hot water. Clear flavor, no milk, nothing in the way of the roast.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    slug: "flat-white",
    name: "Flat White",
    category: "Espresso",
    price: 4.75,
    blurb: "Velvety milk with a stronger coffee kick underneath.",
    details:
      "Microfoam poured over a double shot. Silky texture with more coffee presence than a latte.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "pour-over",
    name: "Pour Over",
    category: "Brewed",
    price: 5.0,
    blurb: "Made to order. Bright, clear, and worth the short wait.",
    details:
      "We brew one cup at a time on V60. Ask what is on the bar today. Usually something fruit forward and clean.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "batch-brew",
    name: "Batch Brew",
    category: "Brewed",
    price: 3.25,
    blurb: "Our daily drip. Straightforward and ready when you are.",
    details:
      "Fresh pots throughout the day. Reliable, warm, and easy if you just need a solid cup.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    slug: "cold-brew",
    name: "Cold Brew",
    category: "Cold",
    price: 4.75,
    blurb: "Steeped overnight. Soft bitterness, no sharp edges.",
    details:
      "Coarse ground coffee steeped for 16 hours. Served over ice. Smooth body with a quiet chocolate note.",
    image:
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    slug: "iced-latte",
    name: "Iced Latte",
    category: "Cold",
    price: 4.75,
    blurb: "Chilled milk and espresso over ice. Easy afternoon pick me up.",
    details:
      "Espresso shaken over ice with cold milk. Refreshing without tasting watered down.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    category: "Food",
    price: 3.75,
    blurb: "Flaky layers, baked fresh each morning by our neighbors.",
    details:
      "Brought in warm from the bakery next door. Crisp outside, soft inside, perfect with anything on the menu.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    slug: "banana-bread",
    name: "Banana Bread",
    category: "Food",
    price: 3.5,
    blurb: "Warm slice with a little crunch on top. Goes well with anything.",
    details:
      "Made in house a few times a week. Moist crumb, toasted walnut top, lightly sweet.",
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
];

const jobSeed = [
  {
    slug: "barista",
    title: "Barista",
    type: "Full time",
    blurb:
      "Pull shots, talk to people, keep the bar calm. Experience helps, but a good attitude matters more.",
  },
  {
    slug: "shift-lead",
    title: "Shift Lead",
    type: "Full time",
    blurb:
      "Open or close the shop, support the floor, and keep mornings moving without the stress.",
  },
  {
    slug: "weekend-baker",
    title: "Weekend Baker Helper",
    type: "Part time",
    blurb:
      "Help finish pastries and restock the case on Saturdays and Sundays. Early shifts, friendly crew.",
  },
];

export async function ensureSchema() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      blurb TEXT NOT NULL,
      details TEXT NOT NULL,
      image TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      available INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'received',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      menu_item_id INTEGER,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT 'general',
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      blurb TEXT NOT NULL,
      open INTEGER NOT NULL DEFAULT 1
    );
  `);
}

export async function seedIfNeeded() {
  await ensureSchema();

  const [{ value: menuCount }] = await db
    .select({ value: count() })
    .from(menuItems);

  if (menuCount === 0) {
    await db.insert(menuItems).values(menuSeed);
  }

  const [{ value: jobCount }] = await db.select({ value: count() }).from(jobs);
  if (jobCount === 0) {
    await db.insert(jobs).values(jobSeed);
  }
}

const isDirectRun = process.argv[1]?.includes("seed.js");
if (isDirectRun) {
  await seedIfNeeded();
  console.log("Database ready.");
  process.exit(0);
}
