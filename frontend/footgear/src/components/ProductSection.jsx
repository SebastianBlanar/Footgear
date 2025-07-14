import "../styles/store.css";

import { ProductCardComponent } from "./ProductCardComponent";

export function ProductSection({ products,brand,checkout=false }) {
  return (
    <section>
      <h2>{brand}</h2>
      <div className="product-card_container">
      {checkout ? (
          products.length > 0 &&
          products.map((p) => <ProductCardComponent product={p} checkout={true} key={p.id} />)
        ) : (
          products.length > 0 &&
          products.map((p) => <ProductCardComponent product={p} key={p.id} />)
        )}
      </div>
    </section>
  );
}
