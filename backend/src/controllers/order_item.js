import { validateOrderItems, validatePartialOrderItems } from "../schemas/orderItems.js"
import { handleZodError, handleInvalidId, isValidUUID, handleNotFound } from "../Utils.js"

export class OrderItemController {
  constructor({ orderItemModel }){
    this.orderItemModel = orderItemModel
  }
  getAll = async (req,res) => {
    const orderItems = await this.orderItemModel.getAll()
    return res.status(200).json(orderItems)
  }
  getById = async (req,res) => {
    const { id } = req.params
    if(! isValidUUID(id)) return handleInvalidId({res,uuid : true})
 
    const orderItem = await this.orderItemModel.getById({id})
    if(! orderItem) return handleNotFound(res,"Order item")
    
    return res.status(200).json(orderItem)
    }
  getByOrderId = async (req,res) => {
    const { id } = req.params
    if(! isValidUUID(id)) return handleInvalidId({res,uuid : true})

    const orderItems = await this.orderItemModel.getByOrderId({id})
    return res.status(200).json(orderItems)
  }
  create = async (req,res) => {
    const results = validateOrderItems(req.body)
    if(! results.success) handleZodError(results,res)
    
    const newOrderItem = await this.orderItemModel.create({input : results.data})
    if(! newOrderItem) return res.status(400).json({error : "Error creating order item"})

    return res.status(201).json(newOrderItem)
  }
  update = async (req,res) => {
    const { id } = req.params
    if(! isValidUUID(id)) return handleInvalidId({res,uuid : true})
    
    const results = validatePartialOrderItems(req.body)
    if (!results.success || Object.keys(results.data).length === 0) handleZodError(results,res)

    const updatedOrderItem = await this.orderItemModel.update({id,input: results.data})
    if(! updatedOrderItem) return res.status(400).json({error : "Error updating order item"})

    return res.status(200).json(updatedOrderItem)
  }
  delete = async (req,res) => {
    const {id} = req.params
    if(! isValidUUID(id)) return handleInvalidId({res,uuid : true})
    
    const deletedOrderItem = await this.orderItemModel.delete({id})
    if(!deletedOrderItem) return res.status(400).json({error : "Error deleting order item"})

    return res.status(200).json({message : "Order item successfully deleted"})
  }
}