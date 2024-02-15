import { Router } from "express";
import { getPrecios, getPrecio, getPreciosByTipo, createPrecio, updatePrecio, deletePrecio} from "../controllers/precio.controller.js"
//import { verifyToken, isModerator, isAdmin, isAdminOrModerator } from "../middlewares/authJwt.js";

const precioRouter = Router()

precioRouter.get('/:id', getPrecio);
precioRouter.get('/', getPrecios);
precioRouter.get('/tipo/:tipoId', getPreciosByTipo);
precioRouter.post('/', createPrecio);
precioRouter.put('/:id', updatePrecio);
precioRouter.delete('/:id', deletePrecio);

export default precioRouter;