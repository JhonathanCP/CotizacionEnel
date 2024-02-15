import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getCotizaciones } from '../api/cotizacion.api';
import { getTipo } from '../api/tipo.api';

export function CotizacionesComponent() {
    const [cotizaciones, setCotizaciones] = useState([]);

    useEffect(() => {
        // Obtener todas las cotizaciones al cargar el componente
        const fetchCotizaciones = async () => {
            try {
                const response = await getCotizaciones();
                const cotizacionesData = await Promise.all(response.data.map(async (cotizacion) => {
                    const preciosData = await Promise.all(cotizacion.precios.map(async (precio) => {
                        const tipoNombre = await getTipoNombreById(precio.tipoId);
                        return {
                            ...precio,
                            tipoNombre,
                        };
                    }));
                    return {
                        ...cotizacion,
                        precios: preciosData,
                    };
                }));
                setCotizaciones(cotizacionesData);
            } catch (error) {
                console.error('Error al obtener cotizaciones:', error);
            }
        };

        fetchCotizaciones();
    }, []);

    const getTipoNombreById = async (tipoId) => {
        try {
            const response = await getTipo(tipoId);
            return response.data.nombre;
        } catch (error) {
            console.error(`Error al obtener información del tipo con ID ${tipoId}:`, error);
            return 'Tipo Desconocido';
        }
    };

    return (
        <Container fluid>
            <h2 className="mb-4">Cotizaciones Creadas</h2>
            <Table striped borderless hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Items</th>
                        <th>Monto Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cotizaciones.map((cotizacion) => (
                        <tr key={cotizacion.id}>
                            <td>{cotizacion.id}</td>
                            <td>{cotizacion.nombre}</td>
                            <td>{cotizacion.descripcion}</td>
                            <td>
                                <Table striped borderless hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Nombre</th>
                                            <th>Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cotizacion.precios.map((precio) => (
                                            <tr key={precio.id}>
                                                <td>{precio.tipoNombre}</td>
                                                <td>{precio.nombre}</td>
                                                <td>{precio.monto.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                {cotizacion.precios.reduce((total, precio) => total + precio.monto, 0).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
