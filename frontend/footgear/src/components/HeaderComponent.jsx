import { DropdownComponent } from "./DropDownComponent"
import { CartComponent } from "./CartComponent"
import '../styles/store.css'

export function HeaderComponent(){
  return (
    <header>
        <div className="container mask navigation">
            <nav>
                <h1 className="">
                    <img className="logo" src="/logo_footgear.png" alt="Logo de Footgear"/>
                </h1>
                <div className="search-bar-container">
                    <input type="search" id="input-search" placeholder="Buscar..." className="search-bar"/>
                    <button id="searchButton" className="search-button" type="submit">Buscar</button>
                    <CartComponent/>
                    <DropdownComponent/>
                </div>
            </nav>
        </div>
    </header>
  )
}