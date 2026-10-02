import {
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.jsx", [
    index("routes/home.jsx"),
    route("menu", "routes/menu.jsx"),
    route("menu/:slug", "routes/menu-item.jsx"),
    route("cart", "routes/cart.jsx"),
    route("checkout", "routes/checkout.jsx"),
    route("orders/:id", "routes/order.jsx"),
    route("about", "routes/about.jsx"),
    route("visit", "routes/visit.jsx"),
    route("contact", "routes/contact.jsx"),
    route("roast", "routes/roast.jsx"),
    route("careers", "routes/careers.jsx"),
  ]),
];
