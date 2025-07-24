import { validateCategory, validateCategoryPartial } from "../schemas/category.js"
import { handleInvalidId, handleNotFound, handleZodError, normalizeString, validateNumber } from "../Utils.js"

export class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel
  }
  getAll = async (req, res) => {
    const categories = await this.categoryModel.getAll()
    return res.status(200).json(categories)
  }
  getById = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId({res})

    const category = await this.categoryModel.getById({ id })
    if (!category) return handleNotFound(res,"category")
    return res.status(200).json(category)
  }
  getByName = async (req, res) => {
    const { name } = req.params
    const formatedName = normalizeString(name)
    if (!formatedName) return res.status(400).json({ error: "Name must be a string value" })

    const category = await this.categoryModel.getByName({ name: formatedName })
    if (!category) return handleNotFound(res,"category")
    return res.status(200).json(category)
  }
  create = async (req, res) => {
    const result = validateCategory(req.body)
    if (!result.success) handleZodError(result,res)
    const formatedName = normalizeString(result.data.name)

    const existent = await this.categoryModel.getByName({ name: formatedName })
    if (existent) return res.status(400).json({ error: "Category name already exists" })

    const newCategory = await this.categoryModel.create({ input: { ...result.data, name: formatedName } })
    if (!newCategory) return res.status(400).json({ error: "Error creating category" })
    return res.status(200).json(newCategory)
  }
  update = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId({res})

    const result = validateCategoryPartial(req.body)
    if (!result.success || Object.keys(result.data).length === 0) handleZodError(result,res)
    const updatedCategory = await this.categoryModel.update({ id, input: result.data })
    if (!updatedCategory) return res.status(400).json({ error: "Error updating category" })
    return res.status(200).json(updatedCategory)
  }
  delete = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId({res})

    const result = await this.categoryModel.delete({ id })
    if (!result) return handleNotFound(res,"category")
    return res.status(200).json({ message: "Category successfully deleted" })
  }
}