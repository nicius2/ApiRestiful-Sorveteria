import { Router } from "express";
import { CatalogController } from "@/controller/catalogController"

const catalogRoutes = Router()
const catalogController = new CatalogController()

catalogRoutes.get("/", catalogController.index)
catalogRoutes.post("/", catalogController.create)
catalogRoutes.put("/:id", catalogController.update)
catalogRoutes.delete("/:id", catalogController.remove)

export { catalogRoutes }