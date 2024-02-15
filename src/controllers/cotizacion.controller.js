import { Cotizacion } from "../models/Cotizacion.js"
import { Precio } from "../models/Precio.js"

export const getCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await Cotizacion.findAll({ include: Precio });
        res.json(cotizaciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const cotizacion = await Cotizacion.findByPk(id, { include: Precio });
        res.json(cotizacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCotizacion = async (req, res) => {
    try {
        const { nombre, descripcion, precios } = req.body;

        // Crear la cotización
        const cotizacion = new Cotizacion({ nombre, descripcion });
        await cotizacion.save();

        // Asociar precios a la cotización si se proporcionan
        if (precios) {
            const foundPrecios = await Precio.findAll({ where: { id: precios } });
            await cotizacion.setPrecios(foundPrecios);
        }

        res.json(cotizacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precios } = req.body;

        // Buscar la cotización por su ID
        const cotizacion = await Cotizacion.findByPk(id, { include: Precio });

        // Verificar si se encontró la cotización
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotizacion no encontrado' });
        }

        // Actualizar los campos de la cotización
        cotizacion.nombre = nombre;
        cotizacion.descripcion = descripcion;

        // Guardar los cambios en la base de datos
        await cotizacion.save();

        // Asociar nuevos precios a la cotización si se proporcionan
        if (precios && Array.isArray(precios) && precios.length > 0) {
            const preciosAsociados = await Precio.findAll({
                where: {
                    id: precios // Suponiendo que los IDs de precios están en el array 'precios'
                }
            });

            // Asociar los nuevos precios a la cotización
            await cotizacion.setPrecios([...cotizacion.precios, ...preciosAsociados]);
        }

        // Devolver la cotización actualizada
        res.json(cotizacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const addPrecioToCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { precioId } = req.body;

        // Buscar la cotización y el precio por sus respectivos IDs
        const cotizacion = await Cotizacion.findByPk(id, { include: Precio });
        const precio = await Precio.findByPk(precioId);

        // Verificar si se encontró la cotización y el precio
        if (!cotizacion || !precio) {
            return res.status(404).json({ message: 'Cotizacion o Precio no encontrado' });
        }

        // Asociar el nuevo precio a la cotización
        await cotizacion.addPrecio(precio);

        // Devolver la cotización actualizada
        res.json(cotizacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCotizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const cotizacion = await Cotizacion.findByPk(id);

        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotizacion not found' });
        }

        await Cotizacion.destroy({
            where: {
                id
            }
        });

        res.status(200).json({ message: 'Deleted successfully', deletedCotizacion: cotizacion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
