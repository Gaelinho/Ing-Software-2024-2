import React, { useState } from "react";

import "./UsuarioForm.css";

const UsuarioFormAgregar = (props) => {
    const [nombre, setNombre] = useState("");
    const [apPat, setApPat] = useState("");
    const [apMat, setApMat] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [superUser, setSuperUser] = useState(false);

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
            nombre: nombre,
            apPat: apPat,
            apMat: apMat,
            password: password,
            email: email,
            superUser: superUser,
        };

        props.guardarUsuario(usuario);
        setNombre("");
        setApPat("");
        setApMat("");
        setPassword("");
        setEmail("");
        setSuperUser(false);
    };

    return (
        <form onSubmit={submitHandler}>
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
        <input type="checkbox" checked={superUser} onChange={setSuperUserHandler} />
        <br />

        <button className="button" type="submit">Agregar usuario</button>

        </form>
        );
    };

export default UsuarioFormAgregar;
