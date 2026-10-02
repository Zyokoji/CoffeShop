# CoffeeShop

A React coffee shop ordering app for customers who order when they arrive.

This is the start of a bigger idea. Right now the focus is a clear customer flow: browse the menu, build a cart, place an order, and pick it up at the counter. Later it can grow into a fuller system for customers, employees, and the business.

## What you can do today

- Browse the menu by category
- Open a drink or food item and add it to your cart
- Adjust quantities in the cart drawer or cart page
- Checkout with your name and contact details
- Get an order confirmation you can show at the bar
- Send a contact note, see hours, and browse open roles

## Tech stack

- React 19
- React Router (framework mode with SSR)
- Vite
- SQLite via LibSQL + Drizzle ORM
- Local brand assets in `coffee-shop/public/brand`

## Requirements

- Node.js 20 or newer
- npm

## Getting started

From the repo root:

```bash
cd coffee-shop
npm install
npm run db:seed
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

The database file is created at `coffee-shop/data/alder.db` on first seed or first server request.

## Useful commands

Run these from `coffee-shop/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the SSR app in development |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run db:seed` | Create tables and seed menu + jobs if empty |
| `npm run brand:export` | Rebuild logo PNG exports from the SVG sources |
| `npm run lint` | Run ESLint |

## How to use the app

1. Open the home page and tap **See the menu**, or go to `/menu`.
2. Filter by Espresso, Brewed, Cold, or Food if you want.
3. Add items to your cart.
4. Review the cart, then go to checkout.
5. Enter your name and email so the bar can find your order.
6. Place the order and keep the confirmation page handy when you arrive.

Orders and contact messages are saved in the local SQLite database.

## Project layout

```text
CoffeShop/
  README.md
  coffee-shop/
    public/          static files, favicon, brand exports
    scripts/         brand export helpers
    src/
      components/    reusable UI pieces
      context/       cart state
      db/            schema, connection, seed
      lib/           shared helpers
      routes/        pages, loaders, actions
```

## Where this is headed

The long term goal is a complete coffee shop system, for example:

- Faster in store ordering for guests who just walked in
- Employee tools for open orders and prep
- Business tools for menu edits, hours, and basic reporting

This repo is the customer facing foundation for that path.

## Notes

- Cart state lives in the browser for now
- Checkout and contact forms hit server actions and write to SQLite
- Brand SVGs live in `coffee-shop/public/brand/`
- If menu images look wrong after pulling new seed data, run `npm run db:seed` again or delete `coffee-shop/data/alder.db` and reseed
