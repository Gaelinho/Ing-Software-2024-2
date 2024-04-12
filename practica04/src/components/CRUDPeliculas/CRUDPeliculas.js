import React, { useState } from 'react';
import './CRUDPeliculas.css';

import PeliculaFormAgregar from "./PeliculaFormAgregar";
import PeliculaFormActualizar from "./PeliculaFormActualizar";

const CRUDPeliculas = (props) => {

    const guardarPelicula = (pelicula) => {
        if (props.peliculas.length === 0) {
            pelicula.idPelicula = 1;
        } else {
            pelicula.idPelicula = props.peliculas[props.peliculas.length - 1].idPelicula + 1;
        }
        const nuevasPeliculas = [...props.peliculas, pelicula];
        props.setPeliculas(nuevasPeliculas);
        alert("Película agregada con ID: " + pelicula.idPelicula);
    }

    const actualizarPelicula = (peliculaAc) => {
        const nuevasPeliculas = [...props.peliculas];
        const indice = nuevasPeliculas.findIndex(pelicula => pelicula.idPelicula === peliculaAc.idPelicula);
        nuevasPeliculas[indice] = peliculaAc;
        props.setPeliculas(nuevasPeliculas);
        alert("Película actualizada");
    }

    const eliminarPelicula = (id) => {
        const nuevasPeliculas = [...props.peliculas];
        const indice = nuevasPeliculas.findIndex(pelicula => pelicula.idPelicula === id);
        nuevasPeliculas.splice(indice, 1);
        props.setPeliculas(nuevasPeliculas);
        alert("Película con ID " + id + " eliminada");
    }

    return (
        <div>
            <h1>Películas</h1>

            <h2>Tabla de Películas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Duración</th>
                        <th>Inventario</th>
                    </tr>
                </thead>
                <tbody>
                    {props.peliculas.map(pelicula => (
                        <tr key={pelicula.idPelicula}>
                            <td>{pelicula.idPelicula}</td>
                            <td>{pelicula.nombre}</td>
                            <td>{pelicula.genero ? pelicula.genero : "-"}</td>
                            <td>{pelicula.duracion ? pelicula.duracion : "-"}</td>
                            <td>{pelicula.inventario}</td>
                            <button class="button" onClick={() => eliminarPelicula(pelicula.idPelicula)}>Eliminar</button>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Agregar Nueva Película</h2>
            <PeliculaFormAgregar guardarPelicula={guardarPelicula}/>
            <br />

            <h2>Actualizar Película</h2>
            <PeliculaFormActualizar peliculas={props.peliculas} actualizarPelicula={actualizarPelicula}/>
        </div>
    );
};

export default CRUDPeliculas;
