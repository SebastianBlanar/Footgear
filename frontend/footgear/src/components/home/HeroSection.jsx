export function HeroSection(){
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Encuentra tu
                  <span className="text-orange-500 block">Estilo Perfecto</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Descubre la colección más exclusiva de sneakers. Calidad premium, 
                  diseños únicos y las últimas tendencias al mejor precio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Explorar Colección
                </button>
                <button className="border border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300">
                  Ver Ofertas
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
              <img 
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Hero Sneaker" 
                className="relative z-10 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
  )
}
