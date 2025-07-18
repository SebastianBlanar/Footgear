import { isValidUUID } from "../Utils.js"

export class StockController {
  constructor({ stockModel }){
    this.stockModel = stockModel
  }
  getByProductId= async (req,res) => {
    const { id } = req.params
    if(! isValidUUID(id)) return res.status(400).json({error : "Id is not a valid UUID"}) 
    
    const stocks = await this.stockModel.getByProductId({id})
    if(! stocks) return res.status(400).json({error : "Stocks not found"})

    return res.status(200).json(stocks)
  } 
}