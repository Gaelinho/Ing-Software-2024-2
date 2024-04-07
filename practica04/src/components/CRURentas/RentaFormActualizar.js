import React, { useState } from "react";

import "./RentaForm.css";

const RentaFormActualizar = (props) => {
    const [idRentar, setIdRentar] = useState("");
    const [estatus, setEstatus] = useState(false);

    const [idActualizar,setIdActualizar] = useState("");

    const setIdRentarHandler = (event) => {
        setIdRentar(event.target.value);
    };

    const buscarHandler = (event) => {
        event.preventDefault();

        setIdActualizar(idRentar);
        const indice = props.rentas.findIndex(renta => renta.idRentar === parseInt(idRentar));
        const rent = props.rentas[indice];
        if (!rent){
            alert("ID no encontrado");
            setEstatus(false);
            setIdActualizar("");
            return;
        }
        setEstatus(rent.estatus);
    }

    const setEstatusHandler = (event) => {
        setEstatus(event.target.checked);
    };

    const setIdActualizarHandler = (event) => {
        setIdActualizar(event.target.checked);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const indice = props.rentas.findIndex(r => r.idRentar === parseInt(idRentar));
        if (indice === -1) {
            alert("ID no elegido");
            return;
        }

        const renta = {
            idRentar: parseInt(idRentar),
            estatus: estatus,
        };

        props.actualizarRenta(renta);
        setEstatus(false);
        setIdRentar("");
        setIdActualizar("");
    };

    return (
        <form onSubmit={submitHandler}>

        <label>ID: </label>
        <input type="number" value={idRentar} min="1" onChange={setIdRentarHandler}/>
        <button className="button" onClick={buscarHandler}>Buscar</button>
        <br />
        <br />

        <a>ID de la Renta a Actualizar: {idActualizar}</a>
        <br />
        <br />

        <label>Estatus: </label>
        <input type="checkbox" checked={estatus} onChange={setEstatusHandler} />
        <br />

        <button className="button" type="submit">Actualizar Renta</button>

        </form>
        );
    };

export default RentaFormActualizar;
