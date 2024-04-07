import React, { useState } from 'react';
import './CRUDUsuarios.css';

import UsuarioFormAgregar from "./UsuarioFormAgregar";
import UsuarioFormActualizar from "./UsuarioFormActualizar";

const CRUDUsuarios = (props) => {

    const guardarUsuario = (usuario) => {
        if(props.usuarios.find(u => u.email === usuario.email)){
            alert("Correo ya registrado");
            return;
        }
        if (props.usuarios.length === 0) {
            usuario.idUsuario = 1;
        } else {
            usuario.idUsuario = props.usuarios[props.usuarios.length - 1].idUsuario + 1;
        }
        const nuevosUsuarios = [...props.usuarios, usuario];
        props.setUsuarios(nuevosUsuarios);
        alert("Usuario agregado con ID: " + usuario.idUsuario);
    }

    const actualizarUsuario = (usuarioAc) => {
        if(props.usuarios.find(u => u.email === usuarioAc.email && u.idUsuario !== usuarioAc.idUsuario)){
            if (usuarioAc.email !== "") {
                alert("Correo ya registrado");
                return;
            }
        }
        const nuevosUsuarios = [...props.usuarios];
        const indice = nuevosUsuarios.findIndex(usuario => usuario.idUsuario === usuarioAc.idUsuario);
        nuevosUsuarios[indice] = usuarioAc;
        props.setUsuarios(nuevosUsuarios);
    }

    const eliminarUsuario = (id) => {
        const nuevosUsuarios = [...props.usuarios];
        const indice = nuevosUsuarios.findIndex(usuario => usuario.idUsuario === id);
        nuevosUsuarios.splice(indice, 1);
        props.setUsuarios(nuevosUsuarios);
    }

    return (
        <div>
            <h1>Usuarios</h1>

            <h2>Tabla de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usuarios.map(usuario => (
                        <tr key={usuario.idUsuario}>
                            <td>{usuario.idUsuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apPat}</td>
                            <td>{usuario.apMat ? usuario.apMat : "-"}</td>
                            <td>{usuario.email ? usuario.email : "-"}</td>
                            <button class="button" onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Agregar Nuevo Usuario</h2>
            <UsuarioFormAgregar guardarUsuario={guardarUsuario}/>
            <br />

            <h2>Actualizar Usuario</h2>
            <UsuarioFormActualizar usuarios={props.usuarios} actualizarUsuario={actualizarUsuario}/>
        </div>
    );
};

export default CRUDUsuarios;
