import React, { useState } from "react";

import "./PeliculaForm.css";

const PeliculaFormAgregar = (props) => {
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [duracion, setDuracion] = useState("");
    const [inventario, setInventario] = useState("");

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

    const submitHandler = (event) => {
        event.preventDefault();

        if (duracion !== "") {
            setDuracion(parseInt(duracion));
        } else {
            setDuracion(null);
        }

        const pelicula = {
            nombre: nombre,
            genero: genero,
            duracion: duracion,
            inventario: parseInt(inventario),
        };

        props.guardarPelicula(pelicula);
        setNombre("");
        setGenero("");
        setDuracion("");
        setInventario("");
    };

    return (
        <form onSubmit={submitHandler}>
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

        <button className="button" type="submit">Agregar película</button>

        </form>
        );
    };

export default PeliculaFormAgregar;
