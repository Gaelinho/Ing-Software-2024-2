import React, { useState } from "react";

import "./UsuarioForm.css";

const UsuarioFormActualizar = (props) => {
    const [idUsuario, setIdUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [apPat, setApPat] = useState("");
    const [apMat, setApMat] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [superUser, setSuperUser] = useState(false);

    const [idActualizar,setIdActualizar] = useState("");

    const setIdUsuarioHandler = (event) => {
        setIdUsuario(event.target.value);
    };

    const buscarHandler = (event) => {
        event.preventDefault();

        setIdActualizar(idUsuario);
        setIdUsuario(event.target.value);
        const indice = props.usuarios.findIndex(usuario => usuario.idUsuario === parseInt(idUsuario));
        const user = props.usuarios[indice];
        if (!user){
            alert("ID no encontrado");
            setIdUsuario("");
            setNombre("");
            setApPat("");
            setApMat("");
            setPassword("");
            setEmail("");
            setSuperUser(false);
            setIdActualizar("");
            return;
        }
        setIdUsuario(user.idUsuario);
        setNombre(user.nombre);
        setApPat(user.apPat);
        setApMat(user.apMat);
        setPassword(user.password);
        setEmail(user.email);
        setSuperUser(user.superUser);
    }

    const setNombreHandler = (event) => {
        setNombre(event.target.value);
    };

    const setApPatHandler = (event) => {
        setApPat(event.target.value);
    };

    const setApMatHandler = (event) => {
        setApMat(event.target.value);
    };

    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    };

    const setEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const setSuperUserHandler = (event) => {
        setSuperUser(event.target.checked);
    };

    const setIdActualizarHandler = (event) => {
        setIdActualizar(event.target.checked);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const indice = props.usuarios.findIndex(usuario => usuario.idUsuario === parseInt(idUsuario));
        if (indice === -1) {
            alert("ID no elegido");
            return;
        }

        const usuario = {
            idUsuario: parseInt(idActualizar),
            nombre: nombre,
            apPat: apPat,
            apMat: apMat,
            password: password,
            email: email,
            superUser: superUser,
        };

        props.actualizarUsuario(usuario);
        setIdUsuario("");
        setNombre("");
        setApPat("");
        setApMat("");
        setPassword("");
        setEmail("");
        setSuperUser(false);
        setIdActualizar("");
    };

    return (
        <form onSubmit={submitHandler}>

        <label>ID: </label>
        <input type="number" value={idUsuario} min="1" onChange={setIdUsuarioHandler}/>
        <button className="button" onClick={buscarHandler}>Buscar</button>
        <br />
        <br />

        <a>ID del Usuario a Actualizar: {idActualizar}</a>
        <br />
        <br />

        <label>Nombre: </label>
        <input type="text" value={nombre} onChange={setNombreHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>Apellido Paterno: </label>
        <input type="text" value={apPat} onChange={setApPatHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>Apellido Materno: </label>
        <input type="text" value={apMat} onChange={setApMatHandler} />
        <br />

        <label>Contraseña: </label>
        <input type="password" value={password} onChange={setPasswordHandler} required/>
        <a class="red-text"> *</a>
        <br />

        <label>email: </label>
        <input type="email" value={email} onChange={setEmailHandler} />
        <br />

        <label>Super User: </label>
        <input type="checkbox" checked={superUser} onChange={setSuperUserHandler}/>
        <br />

        <button className="button" type="submit">Actualizar usuario</button>

        </form>
        );
    };

export default UsuarioFormActualizar;
