import React, { useState } from 'react';
import './CRURentas.css';

import RentaFormAgregar from "./RentaFormAgregar";
import RentaFormActualizar from "./RentaFormActualizar";

const CRUDRentas = (props) => {

    const guardarRenta = (renta) => {
        if(!props.usuarios.find(u => u.idUsuario === renta.idUsuario)){
            alert("ID de Usuario no encontrado");
            return;
        }
        if(!props.peliculas.find(p => p.idPelicula === renta.idPelicula)){
            alert("ID de Pelicula no encontrado");
            return;
        }
        if (props.rentas.length === 0) {
            renta.idRentar = 1;
        } else {
            renta.idRentar = props.rentas[props.rentas.length - 1].idRentar + 1;
        }
        const nuevasRentas = [...props.rentas, renta];
        props.setRentas(nuevasRentas);
    }

    const actualizarRenta = (rentaAc) => {
        const nuevasRentas = [...props.rentas];
        const indice = nuevasRentas.findIndex(renta => renta.idRentar === rentaAc.idRentar);
        nuevasRentas[indice].estatus = rentaAc.estatus;
        props.setRentas(nuevasRentas);
    }

    const eliminarRenta = (id) => {
        const nuevasRentas = [...props.rentas];
        const indice = nuevasRentas.findIndex(renta => renta.idRentar === id);
        nuevasRentas.splice(indice, 1);
        props.setRentas(nuevasRentas);
    }

    return (
        <div>
            <h1>Rentas</h1>

            <h2>Tabla de Rentas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Usuario</th>
                        <th>ID Película</th>
                        <th>Fecha Renta</th>
                        <th>Días de Renta</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rentas.map(renta => (
                        <tr key={renta.idRentar}>
                            <td>{renta.idRentar}</td>
                            <td>{renta.idUsuario}</td>
                            <td>{renta.idPelicula}</td>
                            <td>{renta.fechaRenta}</td>
                            <td>{renta.diasRenta ? renta.diasRenta : "-"}</td>
                            <td>{renta.estatus ? "Devuelta" : "No Devuelta"}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Agregar Nueva Renta</h2>
            <RentaFormAgregar guardarRenta={guardarRenta}/>
            <br />

            <h2>Actualizar Renta</h2>
            <RentaFormActualizar rentas={props.rentas} actualizarRenta={actualizarRenta}/>
        </div>
    );
};

export default CRUDRentas;
