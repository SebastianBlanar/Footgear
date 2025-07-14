import { normalizeString, validateNumber } from "../Utils.js"

export class CategoryController {
  constructor({ categoryModel }){
    this.categoryModel = categoryModel
  }
  getAll = async (req,res) =>{
    const categories = await this.categoryModel.getAll()
    if(! categories) return res.status(400).json({error : "Category not found"})
    return res.status(200).json(categories)
  }
  getById = async (req,res) => {
    const { id } = req.params
    if(! validateNumber(id)) return res.status(400).json({error : "Id must be a integer value"})
    
    const category = await this.categoryModel.getById({id})
    if(! category) return res.status(400).json({error : "Category not found"})
    return res.status(200).json(category)
  }
  getByName = async (req,res) => {
    const { name } = req.params
    const formatedName = normalizeString(name) 
    if(! formatedName) return res.status(400).json({error : "Name must be a string value"})
    
    const category = await this.categoryModel.getByName({ name: formatedName })
    if(! category) return res.status(400).json({error : "Category not found"})
    return res.status(200).json(category)
  }
  create = async (req,res) => {
    const { name } = req.body

    const formatedName = normalizeString(name)
    if(! formatedName) return res.status(400).json({error : "Name must be a string value"})
    
    const existent = await this.categoryModel.getByName({name : formatedName})
    if(existent) return res.status(400).json({error : "Category name already exists"})
      
    const newCategory = await this.categoryModel.create({input : {name : formatedName}})
    if(! newCategory) return res.status(400).json({error : "Error creating category"})
    return res.status(200).json(newCategory)
  }
  update = async (req,res) => {
    const { id } = req.params
    if(!validateNumber(id)) return res.status(400).json({error : "Id must be a numeric value"})

    const { name } = req.body
    const formatedName = normalizeString(name)
    if(!formatedName) return res.status(400).json({error : "Name must be a string value"})
    
    const updatedCategory = await this.categoryModel.update({ id , input : {name : formatedName}})
    if(!updatedCategory) return res.status(400).json({error : "Error updating category"})
    return res.status(200).json(updatedCategory)
  }
  delete = async (req,res) => {
    const { id } = req.params
    if(!validateNumber(id)) return res.status(400).json({error :"id must be a numeric value"})
    
    const result = await this.categoryModel.delete({id})
    if(! result) return res.status(404).json({error : "Error deleting category"})
    return res.status(200).json({message : "Category successfully deleted"})
  }
}