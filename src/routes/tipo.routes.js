import { Router } from "express";
import { getTipos, getTipo, createTipo, updateTipo, deleteTipo} from "../controllers/tipo.controller.js"
//import { verifyToken, isModerator, isAdmin, isAdminOrModerator } from "../middlewares/authJwt.js";

const tipoRouter = Router()

tipoRouter.get('/:id', getTipo);
tipoRouter.get('/', getTipos);
tipoRouter.post('/', createTipo);
tipoRouter.put('/:id', updateTipo);
tipoRouter.delete('/:id', deleteTipo);

export default tipoRouter;