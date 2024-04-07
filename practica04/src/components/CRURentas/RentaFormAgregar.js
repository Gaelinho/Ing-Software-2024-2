import React, { useState } from "react";

import "./RentaForm.css";

const RentaFormAgregar = (props) => {
    const [idUsuario, setIdUsuario] = useState("");
    const [idPelicula, setIdPelicula] = useState("");
    const [fechaRenta, setFechaRenta] = useState("");
    const [diasRenta, setDiasRenta] = useState("");
    const [estatus, setEstatus] = useState(false);

    const setIdUsuarioHandler = (event) => {
        setIdUsuario(event.target.value);
    };

    const setIdPeliculaHandler = (event) => {
        setIdPelicula(event.target.value);
    };

    const setFechaRentaHandler = (event) => {
        setFechaRenta(event.target.value);
    };

    const setDiasRentaHandler = (event) => {
        setDiasRenta(event.target.value);
    };

    const setEstatusHandler = (event) => {
        setEstatus(event.target.checked);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (diasRenta !== "") {
            setDiasRenta(parseInt(diasRenta));
        } else {
            setDiasRenta(null);
        }

        const renta = {
            idUsuario: parseInt(idUsuario),
            idPelicula: parseInt(idPelicula),
            fechaRenta: fechaRenta,
            diasRenta: diasRenta,
            estatus: estatus,
        };

        props.guardarRenta(renta);
        setIdUsuario("");
        setIdPelicula("");
        setFechaRenta("");
        setDiasRenta("");
        setEstatus(false);
    };

    return (
        <form onSubmit={submitHandler}>
        <label>ID Usuario: </label>
        <input type="number" value={idUsuario} onChange={setIdUsuarioHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>ID Película: </label>
        <input type="number" value={idPelicula} onChange={setIdPeliculaHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>Fecha Renta: </label>
        <input type="date" value={fechaRenta} onChange={setFechaRentaHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>Días de Renta: </label>
        <input type="number" value={diasRenta} onChange={setDiasRentaHandler} />
        <br />

        <label>Estatus: </label>
        <input type="checkbox" checked={estatus} onChange={setEstatusHandler} />
        <br />

        <button className="button" type="submit">Agregar Renta</button>

        </form>
        );
    };

export default RentaFormAgregar;
