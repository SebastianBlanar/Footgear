import { validateBrand, validateBrandPartial } from "../schemas/brand.js"
import { handleZodError, handleInvalidId, normalizeString, validateNumber, handleNotFound } from "../Utils.js"

export class BrandController {
  constructor({ brandModel }) {
    this.brandModel = brandModel
  }
  getAll = async (req, res) => {
    const brands = await this.brandModel.getAll()
    return res.status(200).json(brands)
  }
  getById = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId(res)
    const brand = await this.brandModel.getById({ id })
    if (!brand) return handleNotFound(res,"brand")
    return res.status(200).json(brand)
  }
  create = async (req, res) => {
    const result = validateBrand(req.body)
    if (!result.success) handleZodError(result,res)

    const formatedName = normalizeString(result.data.name)

    const existing = await this.brandModel.getByName({ name: formatedName })
    if (existing) return res.status(400).json({ error: "Brand name already exists" })

    const newBrand = await this.brandModel.create({ input: {...result.data , name : formatedName} })
    if (!newBrand) return res.status(400).json({ error: "Error creating new brand" })
    return res.status(201).json(newBrand)
  }
  update = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId(res)

    const result = validateBrandPartial(req.body)
    if (!result.success || Object.keys(result.data).length === 0) handleZodError(result,res)

    const updatedBrand = await this.brandModel.update({ id, input: result.data })
    if (!updatedBrand) return handleNotFound(res,"brand")
    return res.status(200).json(updatedBrand)
  }
  delete = async (req, res) => {
    const { id } = req.params
    if (!validateNumber(id)) return handleInvalidId(res)

    const result = await this.brandModel.delete({ id })
    if (!result) return res.status(404).json({ error: "Error deleting the brand" })
    return res.status(200).json({ message: "Brand succesfully deleted" })
  }
}
