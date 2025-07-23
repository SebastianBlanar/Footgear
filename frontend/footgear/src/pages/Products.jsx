import { ProductSection } from "../components/ProductSection";
import { useBrands } from "../contexts/BrandsContext";
import { useProducts } from "../contexts/ProductsContext";

export function Products() {
  const {brands,getBrandByName,isLoading: brandsLoading,error: brandsError,} = useBrands();
  const {products,isLoading: productsLoading,error: productsError,} = useProducts();
  const filterProductsByBrand = (brand) => products.filter((p) => p.brand_id == getBrandByName(brand).id)
  if (!products.length || !brands.length) {
    return <p>Cargando...</p>;
  }
  const nikeImage = getBrandByName("nike").image
  const adidasImage = getBrandByName("adidas").image
  const pumaImage = getBrandByName("puma").image
  const nikeProducts = filterProductsByBrand("nike")
  const adidasproducts = filterProductsByBrand("adidas")
  const pumaProducts = filterProductsByBrand("puma")
  if (brandsError || productsError) {
    return <h2>Pagina 404</h2>;
  }
  if (brandsLoading || productsLoading) return <h2>Loading...</h2>;

  return (
    <>
      {products.length > 0 && brands.length > 0 && (
        <main>
          {nikeProducts.length > 0 && (
            <>
              <img
                className="mt-2 max-w-full h-auto"
                src={nikeImage}
              ></img>
              <ProductSection
                products={nikeProducts}
                brand={"Nike"}
              />
            </>
          )}
          {adidasproducts.length > 0 && (
            <>
              <img
                className=" max-w-full h-auto"
                src={adidasImage}
              ></img>
              <ProductSection
                products={adidasproducts}
                brand={"Adidas"}
              />
            </>
          )}
          {pumaProducts.length > 0 && (
            <>
              <img
                className=" max-w-full h-auto"
                src={pumaImage}
              ></img>
              <ProductSection
                products={pumaProducts}
                brand={"Puma"}
              />
            </>
          )}
        </main>
      )}
    </>
  );
}
