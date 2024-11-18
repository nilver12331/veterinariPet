const cards = document.querySelectorAll('.card');
const alertaMascota = document.querySelector('.alerta-mascota');
const divResultado = document.querySelector('.resultado-img');
const contenedorResponsivo=document.querySelector('#contenedor-responsivo');
const btnSiguiente=document.querySelector('.btn-siguiente');
const btnAtras=document.querySelector('.btn-atras');
let mascotaObj = {};
let empleadoObj={};
let cliente;
let listaMascota=[];
let estado=1;
let listaEmpleados=[];
let listEmpleados=[];

document.addEventListener('DOMContentLoaded', async () => {
    // Llama a obtenerIdCliente() y espera su resultado
     cliente = await obtenerIdCliente();
    if (cliente) {
        // Si cliente existe, llama a obtenerListaMascota(cliente) y espera su resultado
        listaMascota = await obtenerListaMascota(cliente);
    } else {
        window.location.href="../login.html";
        return;
    }
    let especialidadRest=especialidadSinDuplicidad(listServicios);
    
    if (especialidadRest) {
        for (const idEspecialidad of especialidadRest) {
            // Espera a obtener la lista de empleados para cada especialidad
            const listEmpleados = await obtenerListaEmpleado(idEspecialidad);
            listaEmpleados = [...listaEmpleados, ...listEmpleados];
        }
    }
    // Llama a mostrarHtml y luego selecciona los botones
    mostrarHtml(mascotaObj);
    validarEstadosUno();
    // Ahora selecciona los botones después de crear el HTML
    eventos();
    cargarEventosListener();
    serviciosHtml();
});
function eventos(){
    //Evento seleccionar mascota
    const btnSeleccionar = document.querySelectorAll('.elegir-mascota');
    btnSeleccionar.forEach(mascota => {
        mascota.addEventListener('click', seleccionarMascota);
    });
  btnSiguiente.addEventListener('click',avanzarSeccion);
  btnAtras.addEventListener('click',retrocederSeccion);
  //Evento seleccionar especialista
  const btnSeleccionarespecialista=document.querySelectorAll('.elegir-especialista');
  btnSeleccionarespecialista.forEach(empleado =>{
        empleado.addEventListener('click',seleccionarEmpleado);
  });
  //Evento eliminar especialista
  const btnDeletEspecialistas=document.querySelectorAll('.deletEspecialista');
  btnDeletEspecialistas.forEach(btnDeletEspecialista =>{
        btnDeletEspecialista.addEventListener('click',cancelarEspecialista);
  } )
}
function validarEstadosUno(){
    if(estado==1 && Object.keys(mascotaObj).length > 0){
        btnSiguiente.disabled=false;
    }

}
function seleccionarMascota(e) {
    e.preventDefault();
    const cardMascota = e.target.parentElement.parentElement;
    mascotaObj = {
        id: cardMascota.querySelector('.card-titulo').dataset.id,
        img: cardMascota.querySelector('img').src,
        nombre: cardMascota.querySelector('.card-titulo').textContent,
        raza:cardMascota.querySelector('.raza').textContent,
        edad:cardMascota.querySelector('.edad').textContent,
        peso:cardMascota.querySelector('.peso').textContent
    };
    mostrarHtml(mascotaObj);
    if(btnSiguiente && btnSiguiente.disabled){
        btnSiguiente.disabled=false;
    }
}
function seleccionarEmpleado(e){
    e.preventDefault();
    const cardEmpleado = e.target.parentElement.parentElement;
    console.log(cardEmpleado);
    empleadoObj={
        idTipoServicio:cardEmpleado.querySelector('a').dataset.idServicio,
        idEmpleado:cardEmpleado.querySelector('.card-header').dataset.idEmpleado,
        img:cardEmpleado.querySelector('img').src,
        nombreVeterinario:cardEmpleado.querySelector('.card-header').textContent,
        nombreEspecialidad:cardEmpleado.querySelector('.card-header').dataset.nombreEspecialidad,
        nombreServicio:cardEmpleado.querySelector('.card-header').dataset.nombreServicio
    }
    //revisar si el servicio existe
    const  existe=listEmpleados.some(empleado=>empleado.idTipoServicio==empleadoObj.idTipoServicio);
    if(existe){
        // Encuentra el índice del empleado existente
        const index = listEmpleados.findIndex(empleado => empleado.idTipoServicio == empleadoObj.idTipoServicio);
        // Actualiza el empleado en el índice encontrado
        listEmpleados[index] = empleadoObj;
        mostrarToast(`Se actualizo el empleado para el servicio ${empleadoObj.nombreServicio}`);
        
    }else{
         //agregar servicio a lista de servicios
         listEmpleados=[...listEmpleados,empleadoObj];
         mostrarToast('Se agrego correctamente el empleado');
    }
    mostrarHtml(mascotaObj);
}
//funcion cancelar un especialista
function cancelarEspecialista(e){
    e.preventDefault();
    const serviceEliminar=e.target.dataset.idServicio;
    listEmpleados=listEmpleados.filter(empleadoServicio => empleadoServicio.idTipoServicio!==serviceEliminar);
    mostrarHtml(mascotaObj);
    console.log(e.target.dataset.idServicio);
}
//muestra el html
function mostrarHtml(mascotaObj) {
    switch(estado){
        case 1:
                //limpiar el html que se encuentra
                contenedorResponsivo.innerHTML="";
                let htmlListaMascota;
                if(listaMascota){
                       htmlListaMascota=` <div class="d-flex col-12 col-sm-12 col-lg-6 flex-column">
                                                         <div id="lista-mascota" class="d-flex justify-content-around flex-wrap col-12 col-lg-12 flex-column flex-sm-row">
                                                            <div class="d-flex col-12 justify-content-center pb-3">
                                                             <span class="indicacion-mascota">Seleccione una mascota</span>
                                                            </div>`;
                       listaMascota.forEach(mascota => {
                               const { idMascota, nombre_mascota, peso, edad, genero, raza, img } = mascota;
                               htmlListaMascota+= `
                                   <div class="card col-12 col-sm-5 col-md-5 col-lg-5 mb-4">
                                       <img src="/l/registromascota/images/${img}" alt="imagen de la mascota">
                                       <div class="d-flex flex-column mx-2 my-3">
                                           <div class="d-flex flex-column pb-2 col-12 col-sm-12 col-md-12 col-lg-12">
                                               <span class="fw-bold card-titulo" data-id="${idMascota}">${nombre_mascota}</span>
                                               <div class="d-flex justify-content-around descripcion-mascota">
                                                   <div class="especificacion-mascota">
                                                       <p>Raza</p>
                                                       <span class="raza">${raza}</span>
                                                   </div>
                                                   <div class="especificacion-mascota">
                                                       <p>Edad</p>
                                                       <span class="edad">${edad}</span> <span> años</span>
                                                   </div>
                                                   <div class="especificacion-mascota">
                                                       <p>Peso</p>
                                                       <span class="peso">${peso}</span> <span> kg</span>
                                                   </div>
                                               </div>
                                           </div>
                                           <a href="#" class="elegir-mascota btn btn-primary fw-bold">Seleccionar</a>
                                       </div>
                                   </div>`;
                           });
                       htmlListaMascota+=`</div>
                                        </div>`;

                }
                if (mascotaObj && mascotaObj.nombre) {
                        htmlListaMascota+=` <div class="div-respuesta d-flex col-12 col-sm-12 col-lg-5 flex-column">
                                                           <div class="contenedor-respuesta">
                                                               <span class="alerta-mascota text-uppercase fw-bold pb-3">Mascota Seleccionada es: ${mascotaObj.nombre}</span>
                                                                <img src="${mascotaObj.img}" alt="Imagen de la mascota">
                                                                <div class="pt-3 d-flex flex-column">
                                                                   <div class="d-flex flex-row">
                                                                       <span class="fw-bold me-4 ms-2">Raza:</span>
                                                                       <p>${mascotaObj.raza}</p>
                                                                   </div>
                                                                   <div class="d-flex flex-row">
                                                                       <span class="fw-bold me-4 ms-2">Edad:</span>
                                                                       <p>${mascotaObj.edad} años</p>
                                                                   </div>
                                                                   <div class="d-flex flex-row">
                                                                       <span class="fw-bold me-4 ms-2">Peso:</span>
                                                                       <p>${mascotaObj.peso} kg</p>
                                                                   </div>
                                                                </div>
                                                           </div>
                                                       </div>`;
                    }else{
                        htmlListaMascota+=` <div class="div-respuesta d-flex col-12 col-sm-12 col-lg-5 flex-column">
                                                           <div class="contenedor-respuesta">
                                                               <span class="alerta-mascota">Ninguna mascota seleccionada</span>
                                                                   <div class="resultado-img">
                                                                   </div>
                                                           </div>
                                                       </div>`;
                    }
                    htmlListaMascota+=`</div>`;
                    contenedorResponsivo.innerHTML=htmlListaMascota;
                    // Selecciona todas las tarjetas y añade la clase `.visible` con un pequeño retraso
                    cargarCards();
                    eventos();
                    validarEstadosUno();
        break;
        case 2:
                    //limpiar el html que se encuentra
                    contenedorResponsivo.innerHTML="";
                    let htmlListaEspecialistas="";
                    htmlListaEspecialistas+=`<div class="d-flex col-12 col-sm-12 col-lg-6 flex-column">
                                                <div id="lista-empleado" class="d-flex justify-content-around flex-wrap col-12 col-lg-12 flex-column flex-sm-row">`;
                    if(listaEmpleados){
                        listServicios.forEach(servicio=>{
                            const {id,idEspecialidad,nombre}=servicio;
                        htmlListaEspecialistas+=`<div class="d-flex col-12 pb-3 justify-content-center align-items-center text-center">
                                                    <span class="indicacion-mascota">Seleccione un especialista para el servicio ${nombre}</span>
                                                </div>`;
                                                listaEmpleados.forEach(empleado=>{
                                                    const {idEmpleado,nombreVeterinario,img,especialidad} =empleado;
                                                        if(especialidad.idEspecialidad==idEspecialidad){
                                                        htmlListaEspecialistas+=`
                                                        <div class="card border-success mb-3" style="width: 12rem;">
                                                            <div class="card-header bg-transparent border-success text-center fw-bold" 
                                                            data-id-empleado="${idEmpleado}" 
                                                            data-nombre-especialidad="${especialidad.nombreEspecialidad}"
                                                            data-nombre-servicio="${nombre}"
                                                            >${nombreVeterinario}</div>
                                                            <div class="card-body text-success d-flex align-items-center justify-content-center">
                                                                <img src="/servicios/empleado/images/${img}" alt="especialista" class="img-especialista">
                                                            </div>
                                                            <div class="card-footer bg-transparent border-success">
                                                                <a href="#" class="elegir-especialista btn btn-secondary fw-bold w-100" data-id-servicio="${id}">Seleccionar</a>
                                                            </div>
                                                        </div> 
                                                        `;
                                                        }
                                                }) 
                        });
                    }
                    htmlListaEspecialistas+=`</div>
                                        </div>`    
                    if(listEmpleados.length>0){
                        htmlListaEspecialistas+=`<div class="div-respuesta d-flex col-12 col-sm-12 col-lg-5 flex-column">
                                                           <div class="contenedor-respuesta">
                                                               <span class="alerta-mascota">Especialistas seleccionados</span>
                                                                <table class="table table-striped table-hover align-middle">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Servicio</th>
                                                                            <th>Especialista</th>
                                                                            <th>Img</th>
                                                                            <th>Cancelar</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>`
                        listEmpleados.forEach(empleadoSeleccionado=>{
                                const {idEmpleado,idTipoServicio,nombreServicio,nombreVeterinario,img}=empleadoSeleccionado;
                                htmlListaEspecialistas+=`<tr>
                                                            <td>${nombreServicio}</td>
                                                            <td>${nombreVeterinario}</td>
                                                            <td><img src="${img}" alt="imagen de especialista" class="img-especialitas-seleccionado"></td>
                                                            <td class="text-center"> <a href="#" class="deletEspecialista"><i class="fa-solid fa-trash-can fa-lg" data-id-servicio="${idTipoServicio}"></i></a></td>
                                                        </tr>`
                            });
                                                                    
                        htmlListaEspecialistas+=`                  </tbody>
                                                                </table>
                                                           </div>
                                                       </div>`;
                    }else{
                        htmlListaEspecialistas+=` <div class="div-respuesta d-flex col-12 col-sm-12 col-lg-5 flex-column">
                                                           <div class="contenedor-respuesta">
                                                               <span class="alerta-mascota">No hay ningun especialista seleccionado</span>
                                                            
                                                           </div>
                                                       </div>`;
                    }              
                    contenedorResponsivo.innerHTML=htmlListaEspecialistas;
                    cargarCards();
                    eventos();  
        break;
        case 3:
                //limpiar el html que se encuentra
                contenedorResponsivo.innerHTML="";
                let htmlListaTurnos="";
                htmlListaTurnos+=`<div class="formato-contenedor d-flex col-12 col-sm-12 col-lg-12 flex-column">
                                                <div class="d-flex justify-content-around flex-wrap col-12 col-lg-12 flex-column flex-sm-row">
                                                    <div class="col-3 px-4 py-3">
                                                        <div class="card">
                                                            <div class="w-100">
                                                            <img src="img/jhensu.jpg" class="img-fluid" alt="Imagen Especialista">
                                                            </div>
                                                            <div class="card-body">
                                                                <h5 class="card-title text-center ">Servicio: Emergencia</h5>
                                                            </div>
                                                            <div class="card-footer text-center">
                                                                <small class="text-muted">Jhersson Rocio</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-8">
                                                            <span class="indicacion-mascota pb-3">Seleccione un turno </span>
                                                            <div class="card mt-3" style="width: 14rem;">
                                                                <div class="card-header">
                                                                    Turno disponible
                                                                </div>
                                                                <ul class="list-group list-group-flush">
                                                                    <li class="list-group-item">Fecha: 17/11/2024</li>
                                                                    <li class="list-group-item">Hora: 4.00 p.m</li>
                                                                </ul>
                                                            </div>
                                                    </div>
                                                `;
                    htmlListaTurnos+=`</div> </div>`
                    contenedorResponsivo.innerHTML=htmlListaTurnos;
                    cargarCards();
                    eventos();  
        break;
    }

}


//funciones rest
async function obtenerIdCliente(){
    const response= await fetch('/servicios/cliente/usuarioSesion');
     if (response.ok) {
            const usuario = await response.json();
            return usuario;
        } else {
            console.error("Error: Usuario no autenticado");
            return 0;
     }
}

async function obtenerListaMascota(cliente){
    const {idCliente}=cliente;
    const response= await fetch(`/l/registromascota/cliente/${idCliente}`);
         if (response.ok) {
                const listaMascota = await response.json();
                return listaMascota;
            } else {
                console.error("Error: Usuario no autenticado");
                window.location.href="../login.html";
                return [];
         }
}
async function obtenerListaEmpleado(idEspecialidad){
    const response= await fetch(`/servicios/empleado/especialidad/${idEspecialidad}`);
         if (response.ok) {
                const listaEmpleado = await response.json();
                return listaEmpleado;
            } else {
                console.error("Error: Usuario no autenticado");
                return [];
         }
}
function limpiarDivResultado() {
    divResultado.innerHTML = '';
}
function cargarCards(){
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('card-loaded');
        }, index * 100); // Añade un retraso entre cada tarjeta para un efecto de cascada
    });
}


cards.forEach(card => {
    card.classList.add('card-loaded');
});

function avanzarSeccion(){
    if(estado<5){
        estado+=1;
        mostrarHtml(mascotaObj);
        pintarCarrusel();
    }
}
function retrocederSeccion(){
    if(estado>1){
        estado-=1;
        mostrarHtml(mascotaObj);
        pintarCarrusel();
    }
}

function actualizarClases(btn, removerClase1, removerClase2, agregarClase) {
    // Solo remueve la clase si está definida (no es una cadena vacía)
    if (removerClase1) btn.classList.remove(removerClase1);
    if (removerClase2) btn.classList.remove(removerClase2);
    
    // Agrega la clase especificada
    if (agregarClase) btn.classList.add(agregarClase);
}

function pintarCarrusel() {
    const btnMascota = document.querySelector('#btn-mascota');
    const btnEspecialista = document.querySelector('#btn-especialista');
    const btnTurno = document.querySelector('#btn-turno');
    const btnPago = document.querySelector('#btn-pago');
    console.log(estado);
    switch (estado) {
        case 1:
            actualizarClases(btnMascota, 'btn-boton-cita-realizado', 'btn-boton-cita-estado', 'btn-boton-cita-estado');
            actualizarClases(btnEspecialista, 'btn-boton-cita-estado', 'btn-boton-cita-realizado', '');
            actualizarClases(btnTurno, 'btn-boton-cita-estado', 'btn-boton-cita-realizado', '');
            actualizarClases(btnPago, 'btn-boton-cita-estado', 'btn-boton-cita-realizado', '');
            break;
        case 2:
            actualizarClases(btnMascota, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnEspecialista, 'btn-boton-cita-realizado', '', 'btn-boton-cita-estado');
            actualizarClases(btnTurno, 'btn-boton-cita-realizado', 'btn-boton-cita-estado', '');
            actualizarClases(btnPago, 'btn-boton-cita-estado', 'btn-boton-cita-realizado', '');
            break;
        case 3:
            actualizarClases(btnMascota, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnEspecialista, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnTurno, 'btn-boton-cita-realizado', '', 'btn-boton-cita-estado');
            actualizarClases(btnPago, 'btn-boton-cita-estado', 'btn-boton-cita-realizado', '');
            break;
        case 4:
            actualizarClases(btnMascota, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnEspecialista, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnTurno, 'btn-boton-cita-estado', '', 'btn-boton-cita-realizado');
            actualizarClases(btnPago, '', '', 'btn-boton-cita-estado');
            break;
    }
}

function especialidadSinDuplicidad(listServicios){
    let listaDeEspecialidad=[];
    if(listServicios.length>0){
        listServicios.forEach(servicio=>{
            const {idEspecialidad}=servicio;
            // Verificar si idEspecialidad ya está en listaDeEspecialidad
            if (!listaDeEspecialidad.some(especialidad => especialidad === idEspecialidad)) {
                // Si no está, lo agrega a listaDeEspecialidad
                listaDeEspecialidad.push(idEspecialidad);
            }
        })
    }
    return listaDeEspecialidad;
}
