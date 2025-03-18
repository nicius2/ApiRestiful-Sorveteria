import { Router } from "express";
import { catalogRoutes } from "./catalogRoutes";
import { orderRoutes } from "./ordersController"
const routes = Router()

routes.use("/catalog", catalogRoutes)
routes.use("/orders", orderRoutes)

export { routes }