import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { EditCotizacionComponent } from './components/EditCotizacionComponent'
import { CotizacionesComponent } from './components/CotizacionesComponent'
function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/editar/cotizaciones" element={< EditCotizacionComponent />} />
                <Route path="/cotizaciones" element={< CotizacionesComponent />} />
                <Route path="/" element={<Navigate to="/cotizaciones" />} />
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
        </BrowserRouter>
  )
}

export default App
