import axios from "axios";

const tipoApi = axios.create({
    baseURL: 'http://10.0.28.15:4040/tipo/'
});

export const getTipos = () => tipoApi.get("/");
export const getTipo = (tipoId) => tipoApi.get(`/${tipoId}/`);
export const createTipo = (tipoData) => tipoApi.post("/", tipoData);
export const updateTipo = (tipoId, tipoData) => tipoApi.put(`/${tipoId}/`, tipoData);
export const deleteTipo = (tipoId) => tipoApi.delete(`/${tipoId}/`);