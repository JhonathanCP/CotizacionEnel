import axios from "axios";

const precioApi = axios.create({
    baseURL: 'http://10.0.28.15:4040/precio/'
});

export const getPrecios = () => precioApi.get("/");
export const getPrecio = (precioId) => precioApi.get(`/${precioId}/`);
export const createPrecio = (precioData) => precioApi.post("/", precioData);
export const updatePrecio = (precioId, precioData) => precioApi.put(`/${precioId}/`, precioData);
export const deletePrecio = (precioId) => precioApi.delete(`/${precioId}/`);
export const getPreciosByTipo = (tipoId) => precioApi.get(`/tipo/${tipoId}`);