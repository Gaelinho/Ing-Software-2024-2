import React, { useState } from "react";
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
      <div className="App">
        <header className="App-header">
          <h1>CloneBuster</h1>
        </header>
        <main>
          <section id="usuarios">
            <CRUDUsuarios usuarios={usuarios} setUsuarios={setUsuarios}/>
          </section>

          <section id="peliculas">
            <CRUDPeliculas peliculas={peliculas} setPeliculas={setPeliculas}/>
          </section>

          <section id="rentas">
            <CRURentas rentas={rentas} setRentas={setRentas} usuarios={usuarios} peliculas={peliculas}/>
          </section>
        </main>
      </div>
    );
}

export default App;
