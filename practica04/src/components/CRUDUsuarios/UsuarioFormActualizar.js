import React, { useState } from "react";

import "./UsuarioFormActualizar.css";

const UsuarioFormActualizar = (props) => {
    const [idUsuario, setIdUsuario] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apPat, setApPat] = useState("");
    const [apMat, setApMat] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [superUser, setSuperUser] = useState(false);

    const setIdUsuarioHandler = (event) => {
        setIdUsuario(event.target.value);
    };

    const buscarHandler = (event) => {
        event.preventDefault();

        setIdUsuario(event.target.value);
        const indice = props.usuarios.findIndex(usuario => usuario.idUsuario === parseInt(idUsuario));
        const user = props.usuarios[indice];
        if (!user){
            alert("ID no encontrado");
            setIdUsuario(0);
            setNombre("");
            setApPat("");
            setApMat("");
            setPassword("");
            setEmail("");
            setSuperUser(false);
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

    const submitHandler = (event) => {
        event.preventDefault();

        const usuario = {
            idUsuario: idUsuario,
            nombre: nombre,
            apPat: apPat,
            apMat: apMat,
            password: password,
            email: email,
            superUser: superUser,
        };

        if (
            nombre === "" ||
            apPat === "" ||
            password === ""
        ) {
            alert("Campos vacíos!!");
            return;
        }

        props.actualizarUsuario(usuario);
        setIdUsuario(0);
        setNombre("");
        setApPat("");
        setApMat("");
        setPassword("");
        setEmail("");
        setSuperUser(false);
    };

    return (
        <form onSubmit={submitHandler}>

        <label>ID: </label>
        <input type="number" value={idUsuario} min="0" onChange={setIdUsuarioHandler}/>
        <button className="button" onClick={buscarHandler}>Buscar</button>
        <br />

        <label>Nombre: </label>
        <input type="text" value={nombre} onChange={setNombreHandler}/>
        <br />

        <label>Apellido Paterno: </label>
        <input type="text" value={apPat} onChange={setApPatHandler}/>
        <br />

        <label>Apellido Materno: </label>
        <input type="text" value={apMat} onChange={setApMatHandler} />
        <br />

        <label>Contraseña: </label>
        <input type="password" value={password} onChange={setPasswordHandler} />
        <br />

        <label>email: </label>
        <input type="email" value={email} onChange={setEmailHandler} />
        <br />

        <label>Super User: </label>
        <input type="checkbox" checked={superUser} onChange={setSuperUserHandler} />
        <br />

        <button className="button" type="submit">Actualizar usuario</button>

        </form>
        );
    };

export default UsuarioFormActualizar;
