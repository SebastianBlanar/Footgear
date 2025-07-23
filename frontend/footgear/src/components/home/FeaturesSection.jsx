import { CiDeliveryTruck as Truck} from "react-icons/ci";
import { BsShield as Shield } from "react-icons/bs";
import { SlRefresh as RefreshCw } from "react-icons/sl";
import { CiHeadphones as HeadphonesIcon} from "react-icons/ci";
export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Truck size={32} className="text-black" />
            </div>
            <h3 className="text-xl font-bold">Envío Gratis</h3>
            <p className="text-gray-400">En pedidos mayores a $100</p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Shield size={32} className="text-black" />
            </div>
            <h3 className="text-xl font-bold">Garantía</h3>
            <p className="text-gray-400">
              2 años de garantía en todos los productos
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw size={32} className="text-black" />
            </div>
            <h3 className="text-xl font-bold">Devoluciones</h3>
            <p className="text-gray-400">30 días para devoluciones gratuitas</p>
          </div>
          <div className="text-center space-y-4">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <HeadphonesIcon size={32} className="text-black" />
            </div>
            <h3 className="text-xl font-bold">Soporte 24/7</h3>
            <p className="text-gray-400">Atención al cliente las 24 horas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
