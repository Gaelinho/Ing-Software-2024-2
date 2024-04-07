import React, { useState } from "react";

import "./PeliculaForm.css";

const PeliculaFormActualizar = (props) => {
    const [idPelicula, setIdPelicula] = useState("");
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [duracion, setDuracion] = useState("");
    const [inventario, setInventario] = useState("");

    const [idActualizar,setIdActualizar] = useState("");

    const setIdPeliculaHandler = (event) => {
        setIdPelicula(event.target.value);
    };

    const buscarHandler = (event) => {
        event.preventDefault();

        setIdActualizar(idPelicula);
        setIdPelicula(event.target.value);
        const indice = props.peliculas.findIndex(pelicula => pelicula.idPelicula === parseInt(idPelicula));
        const peli = props.peliculas[indice];
        if (!peli){
            alert("ID no encontrado");
            setIdPelicula("");
            setNombre("");
            setGenero("");
            setDuracion("");
            setInventario("");
            setIdActualizar("");
            return;
        }

        setIdPelicula(peli.idPelicula);
        setNombre(peli.nombre);
        setGenero(peli.genero);
        setDuracion(peli.duracion);
        setInventario(peli.inventario);
    }

    const setNombreHandler = (event) => {
        setNombre(event.target.value);
    };

    const setGeneroHandler = (event) => {
        setGenero(event.target.value);
    };

    const setDuracionHandler = (event) => {
        setDuracion(event.target.value);
    };

    const setInventarioHandler = (event) => {
        setInventario(event.target.value);
    };

    const setIdActualizarHandler = (event) => {
        setIdActualizar(event.target.checked);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const indice = props.peliculas.findIndex(pelicula => pelicula.idPelicula === parseInt(idPelicula));
        if (indice === -1) {
            alert("ID no elegido");
            return;
        }

        if (duracion !== "") {
            setDuracion(parseInt(duracion));
        } else {
            setDuracion(null);
        }

        const pelicula = {
            idPelicula: parseInt(idPelicula),
            nombre: nombre,
            genero: genero,
            duracion: duracion,
            inventario: parseInt(inventario),
        };

        props.actualizarPelicula(pelicula);
        setIdPelicula("");
        setNombre("");
        setGenero("");
        setDuracion("");
        setInventario("");
        setIdActualizar("");
    };

    return (
        <form onSubmit={submitHandler}>

        <label>ID: </label>
        <input type="number" value={idPelicula} min="0" onChange={setIdPeliculaHandler}/>
        <button className="button" onClick={buscarHandler}>Buscar</button>
        <br />
        <br />

        <a>ID de la Película a Actualizar: {idActualizar}</a>
        <br />
        <br />

        <label>Nombre: </label>
        <input type="text" value={nombre} onChange={setNombreHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>Género: </label>
        <input type="text" value={genero} onChange={setGeneroHandler}/>
        <br />

        <label>Duración: </label>
        <input type="number" value={duracion} min="1" onChange={setDuracionHandler} />
        <br />

        <label>Inventario: </label>
        <input type="number" value={inventario} min="0" onChange={setInventarioHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <button className="button" type="submit">Actualizar película</button>

        </form>
        );
    };

export default PeliculaFormActualizar;
