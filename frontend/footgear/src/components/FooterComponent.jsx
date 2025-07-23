import { FaFacebookF as Facebook} from "react-icons/fa";
import { FaInstagram as Ig} from "react-icons/fa";
import { SiThreads as Threads} from "react-icons/si";
export function FooterComponent() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                className="h-14 w-auto object-contain"
                src="/logo_footgear.png"
                alt="Logo de Footgear"
              />
            </div>
            <p className="text-gray-400">
              Tu tienda de confianza para los mejores sneakers. Calidad, estilo
              y comodidad en cada paso.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                <span className="text-black font-bold text-sm">{<Threads/>}</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                <span className="text-black font-bold text-sm">{<Ig/>}</span>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                <span className="text-black font-bold text-sm">{<Facebook/>}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Ofertas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Running
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Basketball
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Lifestyle
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Training
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Newsletter</h3>
            <p className="text-gray-400">
              Suscríbete para recibir ofertas exclusivas
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 FootGear FG. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}