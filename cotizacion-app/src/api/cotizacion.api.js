import axios from "axios";

const cotizacionApi = axios.create({
    baseURL: 'http://10.0.28.15:4040/cotizaciones/'
});

export const getCotizaciones = () => cotizacionApi.get("/");
export const getCotizacion = (cotizacionId) => cotizacionApi.get(`/${cotizacionId}/`);
export const createCotizacion = (cotizacionData) => cotizacionApi.post("/", cotizacionData);
export const updateCotizacion = (cotizacionId, cotizacionData) => cotizacionApi.put(`/${cotizacionId}/`, cotizacionData);
export const addPrecioToCotizacion = (cotizacionId, cotizacionData) => cotizacionApi.put(`/precio/${cotizacionId}/`, cotizacionData);
export const deleteCotizacion = (cotizacionId) => cotizacionApi.delete(`/${cotizacionId}/`);