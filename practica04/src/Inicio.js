import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';

function Inicio() {
    return (
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
        </div>
    );
}

export default Inicio;
