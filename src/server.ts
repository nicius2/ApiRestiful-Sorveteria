import express from "express"
import { routes } from "./routes"
import { errorHandling } from "./middlewares/errorHandling"

const PORT = 3333

const app = express() // passing framework express
app.use(express.json()) // type of file that will be used
app.use(routes) // passing all routes
app.use(errorHandling) // passing middlewares

app.listen(PORT, () => {
    console.log(`Server is runnig PORT ${PORT}`)
})