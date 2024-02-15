import { Tipo } from "../models/Tipo.js"

export const getTipos = async (req, res) => {
    try {
        const tipo = await Tipo.findAll()
        res.json(tipo)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getTipo = async (req, res) => {
    try {
        const {id} = req.params
        const tipo = await Tipo.findByPk(id)
        res.json(tipo)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createTipo = async (req, res) => {
    try {
        const {nombre, descripcion} = req.body
        const tipo = new Tipo()
        tipo.nombre = nombre
        tipo.descripcion = descripcion
        await tipo.save()
        res.json(tipo)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        // Buscar el grupo por su ID
        const tipo = await Tipo.findByPk(id);

        // Verificar si se encontró el grupo
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }

        // Actualizar los campos del grupo
        if (tipo){
            tipo.nombre = nombre;
        } 
        tipo.descripcion = descripcion;

        // Guardar los cambios en la base de datos
        await tipo.save();

        // Devolver el grupo actualizado
        res.json(tipo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ message: 'Tipo not found' });
        }

        await Tipo.destroy({
            where: {
                id
            }
        });

        res.status(200).json({ message: 'Deleted successfully', deletedTipo: tipo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};