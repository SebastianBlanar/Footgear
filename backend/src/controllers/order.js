import { validateOrder, validatePartialOrder } from "../schemas/Order.js"
import { handleZodError, handleInvalidId, isValidUUID, handleNotFound } from "../Utils.js"

export class OrderController {
  constructor({ orderModel }) {
    this.orderModel = orderModel
  }
  getAll = async (req, res) => {
    const orders = await this.orderModel.getAll()
    return res.status(200).json(orders)
  }
  getById = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const order = await this.orderModel.getById({ id })
    if (!order) return handleNotFound(res,"Order")

    return res.status(200).json(order)
  }
  create = async (req, res) => {
    const results = validateOrder(req.body)
    if (!results.success) handleZodError(results,res)

    const createdOrder = await this.orderModel.create({ input: results.data })
    if (!createdOrder) return res.status(400).json({ error: "Error creating Order" })

    return res.status(201).json(createdOrder);
  }
  update = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const results = validatePartialOrder(req.body)
    if (!results.success || Object.keys(results.data).length === 0) handleZodError(results,res)
    const updatedOrder = await this.orderModel.update({ id, input: results.data })
    if (!updatedOrder) return res.status(400).json({ error: "Error updating Order" })
    return res.status(200).json(updatedOrder)
  }
  delete = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const result = await this.orderModel.delete({ id })
    if (!result) return res.status(400).json({ error: "Error deleting Order" })

    return res.status(200).json({ message: "Order successfully deleted" })
  }

}