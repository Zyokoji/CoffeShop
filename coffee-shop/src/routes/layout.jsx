import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/Cart/CartDrawer";
import { CartProvider } from "../context/CartContext";

export default function AppLayout() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
