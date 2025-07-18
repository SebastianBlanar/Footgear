import { ProductCardComponent } from "./ProductCardComponent";

export function ProductSection({ products, brand, cart = false }) {
  return (
    <section>
      <h2>{brand}</h2>
      <div className="flex flex-wrap justify-evenly items-center">
        {cart
          ? products.length > 0 &&
            products.flatMap((p) =>
              p.selected.map((s) => (
                <ProductCardComponent
                  product={p}
                  size={s.size}
                  quantity={s.quantity}
                  cart={true}
                  key={`${p.id}-${s.size}`}
                />
              ))
            )
          : products.length > 0 &&
            products.map((p) => (
              <ProductCardComponent product={p} key={p.id} />
            ))}
      </div>
    </section>
  );
}
