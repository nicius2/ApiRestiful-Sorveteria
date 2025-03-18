import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"
import z, { string } from "zod"
import { AppError } from "@/utils/AppError"

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // Verificação de dados
            const bodySchema = z.object({
                name_Orders: z.string(),
                catalog_id: z.number(),
                quantity: z.number(),
            })

            const { catalog_id, quantity, name_Orders } = bodySchema.parse(request.body)

            // verificando se o sabor esta dispnivel
            const flavor = await knex<CatalogRepository>("catalog").select()
                .where({ id: catalog_id })
                .first()

            if (!flavor) {
                throw new AppError("flavor not found")
            }


            await knex<OrdersRepository>("orders").insert({
                name_Orders,
                flavor: flavor.name,
                catalog_id,
                price_orders: flavor.price,
                quantity
            })

            return response.status(201).json()
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {

            const order = await knex<OrdersRepository>("orders").select()

            return response.json(order)
        } catch (error) {
            next(error)
        }
    }

    async count(request: Request, response: Response, next: NextFunction) {
        try {

            const { name_Orders } = request.query

            const count = await knex<OrdersRepository>("orders")
                .select(
                    "orders.id",
                    "orders.name_Orders as nome_cliente", 
                    knex.raw("SUM(orders.price_orders) as price_count"),
                    knex.raw("SUM(orders.quantity) AS quantity"),
                    "orders.created-at"
                )
                .where("orders.name_Orders", "like", `%${name_Orders}%`) // Busca parcial no nome do cliente
                .first(); // Retorna apenas o primeiro resultado

                if(!count) {
                    throw new AppError("account not found")
                }

            return response.json(count);
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), {message: "id must be a much"})
            .parse(request.params.id)

            const orders = await knex<OrdersRepository>("orders")
            .select()
            .where({id})
            .first()

            if(!orders) {
                throw new AppError("orders not found")
            }  

            await knex<OrdersRepository>("orders")
            .delete()
            .where({id})

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { OrdersController }
