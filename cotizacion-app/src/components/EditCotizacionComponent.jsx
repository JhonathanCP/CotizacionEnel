import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { createCotizacion } from '../api/cotizacion.api';
import { getPrecios, getPreciosByTipo } from '../api/precio.api';
import { getTipos } from '../api/tipo.api';
import 'bootstrap/dist/css/bootstrap.min.css';

export function EditCotizacionComponent() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipos, setTipos] = useState([]);
    const [preciosPorTipo, setPreciosPorTipo] = useState({});
    const [preciosSeleccionados, setPreciosSeleccionados] = useState([]);

    useEffect(() => {
        // Obtener tipos al cargar el componente
        const fetchTipos = async () => {
            try {
                const response = await getTipos();
                setTipos(response.data);
            } catch (error) {
                console.error('Error al obtener tipos:', error);
            }
        };

        fetchTipos();
    }, []);

    useEffect(() => {
        // Obtener precios por tipo para todos los tipos
        const fetchPreciosPorTipo = async () => {
            try {
                const preciosPromises = tipos.map(async (tipo) => {
                    const response = await getPreciosByTipo(tipo.id);
                    return { tipoId: tipo.id, precios: response.data };
                });

                const preciosPorTipoArray = await Promise.all(preciosPromises);
                const preciosPorTipoObject = {};
                preciosPorTipoArray.forEach((item) => {
                    preciosPorTipoObject[item.tipoId] = item.precios;
                });

                setPreciosPorTipo(preciosPorTipoObject);
            } catch (error) {
                console.error('Error al obtener precios por tipo:', error);
            }
        };

        fetchPreciosPorTipo();
    }, [tipos]);

    const handleCreateCotizacion = async () => {
        try {
            const cotizacionData = {
                nombre,
                descripcion,
                precios: preciosSeleccionados,
            };

            const response = await createCotizacion(cotizacionData);
            console.log('Cotización creada:', response.data);
            // Puedes redirigir o hacer algo más después de crear la cotización
        } catch (error) {
            console.error('Error al crear la cotización:', error);
        }
    };

    const handlePrecioSelection = (precioId) => {
        // Toggle de selección de precios
        if (preciosSeleccionados.includes(precioId)) {
            setPreciosSeleccionados(preciosSeleccionados.filter((id) => id !== precioId));
        } else {
            setPreciosSeleccionados([...preciosSeleccionados, precioId]);
        }
    };

    return (
        <Container className="p-4">
            <h2 className="mb-4">Crear Cotización</h2>
            <Form>
                <Form.Group controlId="formNombre" className='mt-3'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDescripcion" className='mt-3'>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>

                {tipos.map((tipo) => (
                    <div key={tipo.id} className='mt-3'>
                        <h5>{`Precios disponibles para ${tipo.nombre}`}</h5>
                        <Row>
                            {preciosPorTipo[tipo.id] &&
                                preciosPorTipo[tipo.id].map((precio) => (
                                    <Col key={precio.id} xs={4}>
                                        <Form.Check
                                            type="checkbox"
                                            label={`${precio.nombre} - Monto: ${precio.monto}.00`}
                                            checked={preciosSeleccionados.includes(precio.id)}
                                            onChange={() => handlePrecioSelection(precio.id)}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                ))}

                <Button variant="primary" onClick={handleCreateCotizacion} className='mt-3'>
                    Crear Cotización
                </Button>
            </Form>
        </Container>
    );
};
