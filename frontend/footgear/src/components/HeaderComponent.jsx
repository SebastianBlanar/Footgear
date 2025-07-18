import { DropdownComponent } from "./DropDownComponent"
import { CartComponent } from "./CartComponent"
import { SearchComponent } from "./SearchComponent"
import { useLocation } from "react-router-dom"
export function HeaderComponent() {
  const location = useLocation()
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
            {location.pathname == "/products" && (
              <>
              <SearchComponent/>
              <DropdownComponent />
              </>
            )}
            <CartComponent />
            </div>
        </nav>
      </div>
    </header>
  )
}
