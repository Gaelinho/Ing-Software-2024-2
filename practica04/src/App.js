import React, { useState } from "react";
import CRUDUsuarios from './components/CRUDUsuarios/CRUDUsuarios'; // Importa el componente CRUDUsuarios

import logo from './logo.svg';
import './App.css';

function App() {

    const [usuarios, setUsuarios] = useState([
        { idUsuario: 1, nombre: 'Gael', apPat: 'Garcia', apMat: 'Aguilera', password: '1234', email: 'gaelgaag10@ciencias.unam.mx', profilePicture: null, superUser: true },
        { idUsuario: 2, nombre: 'Ulises', apPat: 'Garcia', apMat: 'Aguilera', password: '1234', email: 'uga@hotmail.com', profilePicture: null, superUser: true }
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
          {/* Agrega más secciones y componentes CRUD si los tienes */}
        </main>
      </div>
    );
}

export default App;
