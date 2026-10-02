import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { seedIfNeeded } from "../db/seed.js";
import { jobs, menuItems, messages, orderItems, orders } from "../db/schema.js";

let ready;

export async function readyDb() {
  if (!ready) ready = seedIfNeeded();
  await ready;
}

export async function getMenuItems(category) {
  await readyDb();

  if (category && category !== "All") {
    return db
      .select()
      .from(menuItems)
      .where(
        and(eq(menuItems.available, true), eq(menuItems.category, category)),
      );
  }

  return db.select().from(menuItems).where(eq(menuItems.available, true));
}

export async function getFeaturedItems() {
  await readyDb();
  return db
    .select()
    .from(menuItems)
    .where(and(eq(menuItems.available, true), eq(menuItems.featured, true)));
}

export async function getMenuItemBySlug(slug) {
  await readyDb();
  const [item] = await db
    .select()
    .from(menuItems)
    .where(eq(menuItems.slug, slug))
    .limit(1);
  return item ?? null;
}

export async function getCategories() {
  const items = await getMenuItems();
  return ["All", ...new Set(items.map((item) => item.category))];
}

export async function createOrder({
  customerName,
  email,
  phone,
  notes,
  items,
}) {
  await readyDb();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [order] = await db
    .insert(orders)
    .values({
      customerName,
      email,
      phone: phone || "",
      notes: notes || "",
      total,
      status: "received",
      createdAt: new Date().toISOString(),
    })
    .returning();

  if (items.length) {
    await db.insert(orderItems).values(
      items.map((item) => ({
        orderId: order.id,
        menuItemId: item.id ?? null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    );
  }

  return order;
}

export async function getOrderById(id) {
  await readyDb();
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, Number(id)))
    .limit(1);

  if (!order) return null;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  return { ...order, items };
}

export async function createMessage({ name, email, topic, body }) {
  await readyDb();
  const [message] = await db
    .insert(messages)
    .values({
      name,
      email,
      topic: topic || "general",
      body,
      createdAt: new Date().toISOString(),
    })
    .returning();
  return message;
}

export async function getOpenJobs() {
  await readyDb();
  return db.select().from(jobs).where(eq(jobs.open, true));
}
