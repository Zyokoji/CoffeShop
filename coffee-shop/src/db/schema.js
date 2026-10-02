import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const menuItems = sqliteTable("menu_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  blurb: text("blurb").notNull(),
  details: text("details").notNull(),
  image: text("image").notNull(),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  notes: text("notes").notNull().default(""),
  total: real("total").notNull(),
  status: text("status").notNull().default("received"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  menuItemId: integer("menu_item_id"),
  name: text("name").notNull(),
  price: real("price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull().default("general"),
  body: text("body").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const jobs = sqliteTable("jobs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  blurb: text("blurb").notNull(),
  open: integer("open", { mode: "boolean" }).notNull().default(true),
});
