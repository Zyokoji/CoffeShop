export function addItem(cart, item) {
  const existing = cart.find((entry) => entry.id === item.id);

  if (existing) {
    return cart.map((entry) =>
      entry.id === item.id
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry,
    );
  }

  return [...cart, { ...item, quantity: 1 }];
}

export function removeItem(cart, id) {
  return cart.filter((entry) => entry.id !== id);
}

export function setQuantity(cart, id, quantity) {
  if (quantity <= 0) return removeItem(cart, id);

  return cart.map((entry) =>
    entry.id === id ? { ...entry, quantity } : entry,
  );
}

export function cartCount(cart) {
  return cart.reduce((total, entry) => total + entry.quantity, 0);
}

export function cartTotal(cart) {
  return cart.reduce(
    (total, entry) => total + entry.price * entry.quantity,
    0,
  );
}
