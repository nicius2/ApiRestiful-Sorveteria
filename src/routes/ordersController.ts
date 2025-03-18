import { Router } from "express";
import { OrdersController } from "@/controller/ordersController"

const orderRoutes = Router()
const ordersController = new OrdersController()

orderRoutes.post("/", ordersController.create)
orderRoutes.get("/", ordersController.index)
orderRoutes.get("/count", ordersController.count)
orderRoutes.delete("/:id", ordersController.remove)

export { orderRoutes }