import { ProductSection } from "../components/ProductSection";
import { useBrands } from "../contexts/BrandsContext";
import { useProducts } from "../contexts/ProductsContext";

export function Products() {
  const { brands,getBrandId,isLoading : brandsLoading,error:brandsError} = useBrands()
  const { products, isLoading: productsLoading, error : productsError } = useProducts();
  const pumaProducts = () => products.filter((p) => p.brand_id == getBrandId("puma"))
  const nikeProducts =  () => products.filter((p) => p.brand_id == getBrandId("nike"))
  const adidasProducts = () => products.filter((p) => p.brand_id == getBrandId("adidas"))
  if (brandsError || productsError) {
    return <h2>Pagina 404</h2>;
  }
  if (brandsLoading || productsLoading) return <h2>Loading...</h2>;

    return (
    <>
      {products.length > 0 && brands.length > 0 && (
        <main>
          {nikeProducts().length > 0 && (
            <>
            <div className="products-hero">
              <img
                className="mt-24 max-w-full h-auto"
                src={"/img/nike-banner.jpg"}
                ></img>
            </div>
            <ProductSection
              products={nikeProducts()}
              brand={"Nike"}
              />
              </>
          )}
          { adidasProducts().length > 0 && (
            <>
            <div className="products-hero">
              <img
                className="mt-24 max-w-full h-auto"
                src={"/img/adidas-banner.jpg"}
              ></img>
            </div>
            <ProductSection
              products={adidasProducts()}
              brand={"Adidas"}
            />
            </>
          ) }
          { pumaProducts().length > 0 && (
            <>
          <div className="products-hero">
            <img
              className="mt-24 max-w-full h-auto"
              src={"/img/puma-banner.jpg"}
              />
          </div>
          <ProductSection
            products={pumaProducts()}
            brand={"Puma"}
            />
            </>
          )}
        </main>
      )}
    </>
  );
}
