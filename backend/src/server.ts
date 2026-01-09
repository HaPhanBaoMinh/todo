import express from "express"
import { routes } from "./routes"

const app = express()
app.use(express.json())

app.use("/api", routes())
app.get("/health", (req, res) => {
	res.status(200).send("OK")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
