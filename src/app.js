import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cotizacionRouter from "./routes/cotizacion.routes.js"
import precioRouter from "./routes/precio.routes.js"
import tipoRouter from "./routes/tipo.routes.js"

const app = express();

//middlewares
app.use(
    cors()
);
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/cotizaciones', cotizacionRouter)
app.use('/tipo', tipoRouter)
app.use('/precio', precioRouter)

// Archivos estáticos
export default app;
