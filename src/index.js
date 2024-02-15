import app from "./app.js";
import { sequelize } from "./database/database.js"
import './models/Cotizacion.js'

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log('Database connected');
        app.listen(4040);
        console.log("Serven is listening on port", 4040);
    } catch (error) {
        console.log('Unable to connect to database', error);
    }
}

main();