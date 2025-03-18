import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

class CatalogController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const name = typeof request.query.name === "string" ? request.query.name : "";

            const catalog = await knex<CatalogRepository>("catalog")
                .select()
                .whereLike("name", `%${name}%`)
                .orderBy("name")

            return response.status(201).json(catalog)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string({ required_error: "é preciso passar um nome" }).trim().min(3),
                price: z.number().gt(0, { message: "preço tem que ser maior que 0" })
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<CatalogRepository>("catalog").insert({ name, price })

            return response.status(201).json({ name, price })
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be much" })
                .parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(4),
                price: z.number().gt(0),
            })

            const iceCream = await knex<CatalogRepository>("catalog")
                .select()
                .where({ id })
                .first()

            if (!iceCream) {
                throw new AppError("not found")
            }

            const { name, price } = bodySchema.parse(request.body)

            await knex<CatalogRepository>("catalog")
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a much" })
                .parse(request.params.id)

            const iceCream = await knex<CatalogRepository>("catalog")
                .select()
                .where({ id })
                .first()

            if (!iceCream) {
                throw new AppError("iceCream not found")
            }

            await knex<CatalogRepository>("catalog")
                .delete()
                .where({ id })

                return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { CatalogController }