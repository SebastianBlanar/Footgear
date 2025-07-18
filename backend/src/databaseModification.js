import { createApp } from './App.js'
import { initDB } from './db/init.js'
import { BrandModel } from './models/mysql/BrandModel.js'
import { CategoryModel } from './models/mysql/CategoryModel.js'
import { ProductsModel } from './models/mysql/ProductsModel.js'

    const addProducts = async (targetUrl,products) => {
      for (const prod of products) {
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prod)
        }
        const response = await fetch(targetUrl, options)
        if(!response.ok) console.log(response);
        const data = await response.json()
        console.log(data);
      }
    }
    const deleteProducts = async (targetUrl) => {
      const options = {
        method: "DELETE",
      }
      const res = await fetch(targetUrl)
      if(! res.ok) throw new Error("Error fetching products")
      const products = await res.json()  
    const deletedData = []
      for (const prod of products) {
        const res = await fetch(targetUrl + prod.id, options)
        if(! res.ok ) console.log(res);
        const data = await res.json()
        deletedData.push(data)
      }
      return deletedData
    }
    const modifyImages = async(products) => {
      const imageURL = "https://ik.imagekit.io/footgear/img/"
      for(const prod of products){
        const formatedName = prod.name.split(" ").join("-") + ".png"
        console.log( imageURL + formatedName);
        const options = {
          method : "PATCH",
          headers : {
            "Content-Type" : "application/json" 
          },
          body : JSON.stringify({image : imageURL + formatedName})
        }
        const res = await fetch("http://localhost:1234/products/" + prod.id,options)
        if(!res.ok) console.log(res);
        const data = await res.json()
        console.log(data);
      }
    }

const startServer = async () => {
  try {
    await initDB()
    await createApp({ productsModel: ProductsModel, brandModel: BrandModel, categoryModel: CategoryModel })

    const res = await fetch("http://localhost:1234/products")
    if(!res.ok) return
    const products = await res.json()
    await modifyImages(products)

  } catch (error) {
    console.error('❌ Error initializing the database:', error)
  }
}

startServer()