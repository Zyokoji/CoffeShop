import { Link, useSearchParams } from "react-router";
import { useEffect } from "react";
import PageHero from "../components/PageHero";
import { formatPrice } from "../lib/format";
import { getOrderById } from "../lib/shop";
import { useCart } from "../context/CartContext";

export function meta({ data }) {
  return [
    {
      title: data?.order
        ? `Order #${data.order.id} · Alder Coffee`
        : "Order · Alder Coffee",
    },
  ];
}

export async function loader({ params, request }) {
  const order = await getOrderById(params.id);
  if (!order) {
    throw new Response("Order not found", { status: 404 });
  }

  const url = new URL(request.url);
  return {
    order,
    fresh: url.searchParams.get("fresh") === "1",
  };
}

export default function OrderPage({ loaderData }) {
  const { order, fresh } = loaderData;
  const { clear } = useCart();
  const [params] = useSearchParams();

  useEffect(() => {
    if (fresh || params.get("fresh") === "1") {
      clear();
    }
  }, [fresh, params, clear]);

  return (
    <>
      <PageHero
        compact
        title={fresh ? "We got your order" : `Order #${order.id}`}
        text={
          fresh
            ? "Thanks. We will start on it shortly. Bring your name to the counter."
            : "Here is what you ordered with us."
        }
        image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=80"
        primaryTo="/menu"
        primaryLabel="Order again"
      />

      <section className="page-panel order-panel">
        <dl className="visit-details">
          <div>
            <dt>Name</dt>
            <dd>{order.customerName}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{order.status}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>

        <ul className="order-items">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.quantity} × {item.name}
              </span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>

        {order.notes ? (
          <p className="order-notes">Note: {order.notes}</p>
        ) : null}

        <Link className="text-link dark" to="/">
          Back home
        </Link>
      </section>
    </>
  );
}
