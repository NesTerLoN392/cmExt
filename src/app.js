const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const initModels = require("./models/initMoldes");
const db = require("./utils/database");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandlerRouter = require("./routes/errorHandler.routes");
initModels();


const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 8000;

db.authenticate()
    .then(() => {
        console.log("Base de datos conectada");
    })
    .catch((error) => console.log(error));

db.sync({ alter: false }) // alterar los atributos
    .then(() => console.log("Base de datos sync"))
    .catch((error) => console.log(error));

app.use(userRoutes);
app.use(authRoutes);


app.get("/", (req, res) => {
    res.send("Bienvenidos a Ecommerce Documentacion: https://documenter.getpostman.com/view/25958966/2s93RUuC2b");
})

errorHandlerRouter(app);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});