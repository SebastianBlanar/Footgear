import { validateCustomer, validatePartialCustomer } from "../schemas/customer.js"
import { handleZodError, handleInvalidId, isValidUUID, handleNotFound } from "../Utils.js"

export class CustomerController {
  constructor({customerModel}){
    this.customerModel = customerModel
  }
    getAll = async (req, res) => {
      const customers = await this.customerModel.getAll()
      return res.status(200).json(customers)
    }
    getById = async (req, res) => {
      const { id } = req.params
      if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)
  
      const customer = await this.customerModel.getById({ id })
      if (!customer) return handleNotFound(res,"category")
  
      return res.status(200).json(customer)
    }
    create = async (req, res) => {
      const results = validateCustomer(req.body)
      if(! results.success) handleZodError(results,res)
      
      const createdCustomer = await this.customerModel.create({input : results.data})
      if(! createdCustomer) return res.status(400).json({error : "Error creating customer"})

      return res.status(201).json(createdCustomer);
    }
    update = async (req, res) => {
      const { id } = req.params
      if(! isValidUUID(id)) return handleInvalidId(res,uuid=true)

      const results = validatePartialCustomer(req.body)
      if (!results.success || Object.keys(results.data).length === 0) handleZodError(results,res)
      
      const updatedCustomer = await this.customerModel.update({id,input : results.data})
      if(! updatedCustomer) return res.status(400).json({error : "Error updating customer"})

      return res.status(201).json(updatedCustomer)
    }
    delete = async (req, res) => {
      const { id } = req.params
      if ( ! isValidUUID(id)) return handleInvalidId(res,uuid=true)
      
      const result = await this.customerModel.delete({id})
      if(! result) return res.status(400).json({error : "Error deleting customer"})

      return res.status(200).json({message : "Customer successfully deleted"})
    }
  
}