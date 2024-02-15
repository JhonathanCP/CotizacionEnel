import { Router } from "express";
import { getCotizaciones, getCotizacion, createCotizacion, updateCotizacion, addPrecioToCotizacion, deleteCotizacion} from "../controllers/cotizacion.controller.js"
//import { verifyToken, isModerator, isAdmin, isAdminOrModerator } from "../middlewares/authJwt.js";

const cotizacionRouter = Router()

cotizacionRouter.get('/:id', getCotizacion);
cotizacionRouter.get('/', getCotizaciones);
cotizacionRouter.post('/', createCotizacion);
cotizacionRouter.put('/:id', updateCotizacion);
cotizacionRouter.put('/precio/:id', addPrecioToCotizacion);
cotizacionRouter.delete('/:id', deleteCotizacion);

export default cotizacionRouter;