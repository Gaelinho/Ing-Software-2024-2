import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CRUDUsuarios from './components/CRUDUsuarios/CRUDUsuarios';
import CRUDPeliculas from './components/CRUDPeliculas/CRUDPeliculas';
import CRURentas from './components/CRURentas/CRURentas';

import logo from './logo.svg';
import './App.css';

function App() {

    const [usuarios, setUsuarios] = useState([
        { idUsuario: 1, nombre: 'Gael', apPat: 'Garcia', apMat: 'Aguilera', password: '1234', email: 'gaelgaag10@ciencias.unam.mx', profilePicture: null, superUser: true },
        { idUsuario: 2, nombre: 'Ulises', apPat: 'Garcia', apMat: 'Aguilera', password: '1234', email: 'uga@hotmail.com', profilePicture: null, superUser: true }
    ]);

    const [peliculas, setPeliculas] = useState([
        { idPelicula: 1, nombre: "Joker", genero: "Suspenso", duracion: 122, inventario: 2 },
        { idPelicula: 2, nombre: "Kung Fu Panda", genero: "Comedia", duracion: 92, inventario: 5 }
    ]);

    const [rentas, setRentas] = useState([
        { idRentar: 1, idUsuario: 1, idPelicula: 2, fechaRenta: "2024-04-04", diasRenta: 5, estatus: false},
        { idRentar: 2, idUsuario: 2, idPelicula: 2, fechaRenta: "2024-04-26", diasRenta: 3, estatus: true}
    ]);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>CloneBuster</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/usuarios">Usuarios</Link>
                            </li>
                            <li>
                                <Link to="/peliculas">Películas</Link>
                            </li>
                            <li>
                                <Link to="/rentas">Rentas</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/usuarios" element={<CRUDUsuarios usuarios={usuarios} setUsuarios={setUsuarios}/>} />
                        <Route path="/peliculas" element={<CRUDPeliculas peliculas={peliculas} setPeliculas={setPeliculas}/>} />
                        <Route path="/rentas" element={<CRURentas rentas={rentas} setRentas={setRentas} usuarios={usuarios} peliculas={peliculas}/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );

}

export default App;
