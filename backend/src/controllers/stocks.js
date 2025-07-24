import { validatePartialStock, validateStock } from "../schemas/stock.js"
import { handleZodError, handleInvalidId, isValidUUID, validateNumber, handleNotFound } from "../Utils.js"

export class StockController {
  constructor({ stockModel }){
    this.stockModel = stockModel
  }
  getAll = async (req,res) => {
    const stocks = await this.stockModel.getAll()
    return res.status(200).json(stocks)
  }
  getById = async (req,res) => {
    const { id } = req.params
    if(! validateNumber(id)) return handleInvalidId({res})
    
    const stock = await this.stockModel.getById({id})
    if(!stock) return handleNotFound(res,"Stock")
    
    return res.status(200).json(stock)

  }
  getByProductId= async (req,res) => {
    const { id } = req.params
    if(! isValidUUID(id)) return handleInvalidId({res,uuid : true})
    
    const stocks = await this.stockModel.getByProductId({id})
    if(! stocks) return handleNotFound(res,"Stock")

    return res.status(200).json(stocks)
  } 
  create = async (req,res) => {
    const results = validateStock(req.body)
    if(! results.success) handleZodError(results,res)
  
    const newStock = await this.stockModel.create({input : results.data})
    if(! newStock) return res.status(400).json({error : "Error creating stock"})

    return res.status(200).json(newStock)
  } 
  update = async (req,res) => {
    const { id } = req.params
    if(! validateNumber(id) ) return handleInvalidId({res})

    const results = validatePartialStock(req.body)
    if (!results.success || Object.keys(results.data).length === 0) handleZodError(results,res)
    
    const updatedStock = await this.stockModel.update({id,input : results.data })
    if(! updatedStock) return res.status(400).json({error : "Error updating stock"})

    return res.status(200).json(updatedStock)
  }
  delete = async (req,res) => {
    const { id } = req.params
    if( ! validateNumber(id) ) handleInvalidId({res})
    
    const deletedStock = await this.stockModel.delete({id})
    if(! deletedStock) return res.status(400).json({error : "Error deleting stock"})

    return res.status(200).json({message : "Stock successfully deleted"})
  }
}