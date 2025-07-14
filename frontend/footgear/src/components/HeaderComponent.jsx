import { DropdownComponent } from "./DropDownComponent"
import { CartComponent } from "./CartComponent"

export function HeaderComponent() {
  return (
    <header className="fixed top-0 right-0 w-full z-[100] bg-gradient-to-b from-black to-transparent pt-2">
      <div className="flex flex-col items-center justify-center">
        <nav className="flex flex-col items-center text-center pb-1 md:flex-row md:justify-around bg-black w-full">
          <h1>
            <img
              className="h-14 w-auto object-contain"
              src="/logo_footgear.png"
              alt="Logo de Footgear"
            />
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
            <input
              type="search"
              id="input-search"
              placeholder="Buscar..."
              className="px-3 py-2 border border-white rounded-md outline-none bg-white transition-all duration-300 w-[30%] focus-within:w-[70%] md:w-auto"
            />
            <button
              id="searchButton"
              type="submit"
              className="text-sm font-bold px-3 py-2 rounded-md bg-orange-400 text-black hover:bg-gray-300 active:border active:border-white w-[20%] md:w-auto"
            >
              Buscar
            </button>
            <CartComponent />
            <DropdownComponent />
          </div>
        </nav>
      </div>
    </header>
  )
}
