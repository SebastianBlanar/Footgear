import { normalizeString, validateNumber } from "../Utils.js"

export class BrandController {
  constructor({ brandModel }){
    this.brandModel = brandModel
  }
  getAll = async (req,res) => {
    const brands = await this.brandModel.getAll()
    if(! brands) return res.status(400).json({error : "Brands not found"})
    return res.status(200).json(brands)
  } 
  getById = async (req,res) => {
    const { id } = req.params
    if(!validateNumber(id)) return res.status(400).json({error : "Id must be a positive integer value"})
    const brand = await this.brandModel.getById({id})
    if(! brand) return res.status(400).json({error : "Brand not found"})
    return res.status(200).json(brand)
  }
  create = async (req,res) => {
    let {name} = req.body
    const formatedName = normalizeString(name)
    if(!formatedName) return res.status(400).json({error : "Name must be a string value"})

    const existing = await this.brandModel.getByName({ name: formatedName })
    if (existing) return res.status(400).json({error : "Brand name already exists"})

    const newBrand = await this.brandModel.create({input : {name : formatedName}})
    if(! newBrand) return res.status(400).json({error : "Error creating new brand"})
    return res.status(200).json(newBrand)
  }
  update = async (req,res) => {
    const {id } = req.params
    if(!validateNumber(id)) return res.status(400).json({error : "Id must be a positive integer value"})
    const { name } = req.body
    const formatedName = normalizeString(name)
    if(!formatedName) return res.status(400).json({error : "Name must be a string value"})

    const updatedBrand = await this.brandModel.update({id,input : {name : formatedName}})
    if(! updatedBrand) return res.status(400).json({error : "Error updating the brand"})
    return res.status(200).json(updatedBrand)
  }
  delete = async (req,res) => {
    const { id } = req.params
    if(!validateNumber(id)) return res.status(400).json({error : "Id must be a positive integer value"})
    
    const result = await this.brandModel.delete({id})
    if(! result) return res.status(404).json({error : "Error deleting the brand"})
    return res.status(200).json({message : "Brand succesfully deleted"})
  }
}
