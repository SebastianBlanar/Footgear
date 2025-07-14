import { createContext, useContext, useEffect, useState } from "react";
export const BrandsContext = createContext()

export function BrandsProvider({ children }){
  const [ brands,setBrands ] = useState([])
  const [ isLoading,setIsLoading ] = useState(true)
  const [error,setError] = useState(null)

  const getBrandId = (name) =>brands.find((b) => b.name.toLowerCase() == name ).id
  useEffect(()=>{
    async function fetchBrands(){
      try {
        const res = await fetch("http://localhost:1234/brands/")
        if(! res.ok) throw new Error("Error fetching brands")
        const data = await res.json()
        setBrands(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBrands()
  },[])
  return <BrandsContext.Provider value={{brands,getBrandId,isLoading,error} }>
    {children}
  </BrandsContext.Provider>
}

export function useBrands(){
  return useContext(BrandsContext)
}