import { Precio } from "../models/Precio.js"
import { Tipo } from "../models/Tipo.js"

export const getPrecios = async (req, res) => {
    try {
        const precio = await Precio.findAll()
        res.json(precio)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPrecio = async (req, res) => {
    try {
        const { id } = req.params
        const precio = await Precio.findByPk(id)
        res.json(precio)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPreciosByTipo = async (req, res) => {
    try {
        const { tipoId } = req.params;

        // Validar que tipoId sea un número
        if (isNaN(tipoId)) {
            return res.status(400).json({ message: 'El tipoId debe ser un número válido.' });
        }

        // Buscar el tipo por su ID
        const tipo = await Tipo.findByPk(tipoId);

        // Verificar si se encontró el tipo
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado.' });
        }

        // Obtener los precios asociados al tipo
        const precios = await Precio.findAll({
            where: {
                tipoId: tipo.id,
            },
        });

        res.json(precios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPrecio = async (req, res) => {
    try {
        const { nombre, descripcion, monto, tipoId } = req.body
        const precio = new Precio()
        precio.nombre = nombre
        precio.descripcion = descripcion
        precio.monto = monto
        precio.tipoId = tipoId
        await precio.save()
        res.json(precio)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updatePrecio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, monto, tipoId } = req.body;

        // Buscar el grupo por su ID
        const precio = await Precio.findByPk(id);

        // Verificar si se encontró el grupo
        if (!precio) {
            return res.status(404).json({ message: 'Precio no encontrado' });
        }

        // Actualizar los campos del grupo
        if (precio) {
            precio.nombre = nombre;
            precio.descripcion = descripcion;
            precio.monto = monto;
            precio.tipoId = tipoId;
        }

        // Guardar los cambios en la base de datos
        await precio.save();

        // Devolver el grupo actualizado
        res.json(precio);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePrecio = async (req, res) => {
    try {
        const { id } = req.params;
        const precio = await Precio.findByPk(id);

        if (!precio) {
            return res.status(404).json({ message: 'Precio not found' });
        }

        await Precio.destroy({
            where: {
                id
            }
        });

        res.status(200).json({ message: 'Deleted successfully', deletedTipo: precio });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};