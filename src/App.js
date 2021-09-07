import React, { useState, useEffect } from "react";
import { store } from "./firebaseconfig";

function App() {
  const [modoedicion, setmodoedicion] = useState(null);
  const [idusuario, setidusuario] = useState("");
  const [nombre, setnombre] = useState("");
  const [telefono, settelefono] = useState("");
  const [usuariosAgenda, setUsuariosAgenda] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuariosAgenda(nuevoArray);
    };
    getUsuarios();
  }, []);

  const setUsuarios = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      seterror("El Campo Nombre Está Vacío");
    }
    if (!telefono.trim()) {
      seterror("El Campo Teléfono Está Vacío");
    }
    const usuario = {
      nombre: nombre,
      telefono: telefono,
    };
    try {
      const data = await store.collection("agenda").add(usuario);
      const { docs } = await store.collection("agenda").get();
      alert("Usuario Añadido");
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuariosAgenda(nuevoArray);
    } catch (e) {
      console.log(e);
    }
    setnombre("");
    settelefono("");
  };

  const setUpdate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      seterror("El Campo Nombre Está Vacío");
    }
    if (!telefono.trim()) {
      seterror("El Campo Teléfono Está Vacío");
    }
    const userupdate = {
      nombre: nombre,
      telefono: telefono,
    };
    try {

      await store.collection("agenda").doc(idusuario).set(userupdate);
      alert("Usuario Actualizado");
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuariosAgenda(nuevoArray);
    } catch (e) {
      console.log(e);
    }
    setnombre("");
    settelefono("");
  };

  const eliminarUsuario = async (id) => {
    try {
      await store.collection("agenda").doc(id).delete(id);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuariosAgenda(nuevoArray);
    } catch (e) {
      console.log(e);
    }
  };

  const clickEditarUsuario = async (id) => {
    try {
      const data = await store.collection("agenda").doc(id).get();
      const { nombre, telefono } = data.data();
      setnombre(nombre);
      settelefono(telefono);
      setidusuario(id);
      setmodoedicion(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form
            className="form-group"
            onSubmit={modoedicion ? setUpdate : setUsuarios}
          >
            <input
              value={nombre}
              onChange={(e) => {
                setnombre(e.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Ingrese Nombre"
            />
            <input
              value={telefono}
              onChange={(e) => {
                settelefono(e.target.value);
              }}
              className="form-control mt-3"
              type="text"
              placeholder="Ingrese Teléfono"
            />
            {modoedicion ? (
              <input
                className="btn btn-dark btn-block mt-3 form-control"
                type="submit"
                value="Editar"
              />
            ) : (
              <input
                className="btn btn-dark btn-block mt-3 form-control"
                type="submit"
                value="Registrar"
              />
            )}
          </form>
          {error ? <div className="danger">{error}</div> : <span></span>}
        </div>
        <div className="col">
          <h2>Agenda</h2>
          <ul className="list-group">
            {usuariosAgenda.length !== 0 ? (
              usuariosAgenda.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.nombre} -- {item.telefono}
                  <button
                    onClickCapture={(id) => {
                      eliminarUsuario(item.id);
                    }}
                    className="btn btn-danger mr-3 float-right"
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-info float-right"
                    onClick={(id) => {
                      clickEditarUsuario(item.id);
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))
            ) : (
              <span>No hay Usuarios en la Agenda</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
