import { Form, redirect, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import Button from "../components/ui/Button";
import { formatPrice } from "../lib/format";
import { createOrder } from "../lib/shop";
import { useCart } from "../context/CartContext";

export function meta() {
  return [{ title: "Checkout · Alder Coffee" }];
}

export async function action({ request }) {
  const form = await request.formData();
  const rawItems = String(form.get("items") || "[]");
  let items = [];

  try {
    items = JSON.parse(rawItems);
  } catch {
    return { error: "We could not read your cart. Please try again." };
  }

  if (!items.length) {
    return { error: "Your cart is empty." };
  }

  const customerName = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const notes = String(form.get("notes") || "").trim();

  if (!customerName || !email) {
    return { error: "Name and email help us find your order." };
  }

  const order = await createOrder({
    customerName,
    email,
    phone,
    notes,
    items,
  });

  return redirect(`/orders/${order.id}?fresh=1`);
}

export default function CheckoutPage({ actionData }) {
  const { cart, total } = useCart();
  const navigation = useNavigation();
  const [itemsJson, setItemsJson] = useState("[]");
  const busy = navigation.state !== "idle";

  useEffect(() => {
    setItemsJson(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <PageHero
        compact
        title="Checkout"
        text="Tell us who the order is for. We will get it ready at the bar."
        image="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="page-panel checkout-grid">
        <Form method="post" className="form-stack">
          <input type="hidden" name="items" value={itemsJson} />

          <label>
            Name
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
            />
          </label>
          <label>
            Phone
            <input name="phone" placeholder="Optional" />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              rows={4}
              placeholder="Oat milk, extra hot, leave at the counter..."
            />
          </label>

          {actionData?.error ? (
            <p className="form-error">{actionData.error}</p>
          ) : null}

          <Button type="submit" disabled={!cart.length || busy}>
            {busy ? "Placing order..." : "Place order"}
          </Button>
        </Form>

        <aside className="checkout-summary">
          <h2>Summary</h2>
          {cart.length === 0 ? (
            <p>Add something from the menu first.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </aside>
      </section>
    </>
  );
}
