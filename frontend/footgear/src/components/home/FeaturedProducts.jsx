import { CiStar as Star} from "react-icons/ci";
export function FeaturedProducts({featuredProducts}){
  return (
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Productos Destacados</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="aspect-square bg-gray-800 p-8 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 text-sm font-semibold">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-orange-500 fill-current" />
                      <span className="text-sm text-gray-400">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}