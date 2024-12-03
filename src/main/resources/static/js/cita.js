const cards = document.querySelectorAll('.card');
const alertaMascota = document.querySelector('.alerta-mascota');
const divResultado = document.querySelector('.resultado-img');
const contenedorResponsivo=document.querySelector('#contenedor-responsivo');
const btnSiguiente=document.querySelector('.btn-siguiente');
const btnAtras=document.querySelector('.btn-atras');
let totalPagar=0;
let mascotaObj = {};
let empleadoObj={};
let cliente;
let listaMascota=[];
let estado=1;
let listaEmpleados=[];
let listEmpleados=[];
let listaTurnos=[];
let listaTurnosSeleccionados=[];
let detalleCliente={};
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
    //Evento seleccionar turno
    const cardTurnos=document.querySelectorAll('.card-turno');
    cardTurnos.forEach(cardTuno=>{
        cardTuno.addEventListener('click',seleccionarTurno);
    })
    //Evento eliminar turno
    const btnEliminarTurnos=document.querySelectorAll('.deletTurno');
    btnEliminarTurnos.forEach(btnEliminarTurno=>{
        btnEliminarTurno.addEventListener('click',cancelarTurno);
    })
    //Evento pago
    const generarPago=document.querySelector('#generar-pago');
    if (generarPago) {
        generarPago.addEventListener('click', checkout);
    } 
}
function validarEstadosUno(){
    if(estado==1 && Object.keys(mascotaObj).length > 0){
        btnSiguiente.disabled=false;
    }

}
//funciones de seleccionar
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
function seleccionarTurno(e){
    const cardEmpleado = e.currentTarget;
    let turnoObj={
        idTurno:cardEmpleado.querySelector('span').dataset.idTurno,
        idTipoServicio:cardEmpleado.querySelector('.card-header').dataset.idServicio,
        idEmpleado:cardEmpleado.querySelector('.card-header').dataset.idEmpleado,
        nombreServicio:cardEmpleado.querySelector('.list-group-flush').dataset.servicioNombre,
        nombreVeterinario:cardEmpleado.querySelector('.list-group-flush').dataset.nombreVeterinario,
        fecha:cardEmpleado.querySelector('.list-group-flush').dataset.fecha,
        hora:cardEmpleado.querySelector('.list-group-flush').dataset.hora,
    }
     // Verificamos si el turno con el mismo idTipoServicio ya existe en la lista
        const index = listaTurnosSeleccionados.findIndex(turno => turno.idTipoServicio === turnoObj.idTipoServicio);

        // Si ya existe un turno con el mismo idTipoServicio, primero cambiamos su estado a 1 y luego reemplazamos
        if (index !== -1) {
            // Restablecer el estado del turno anterior a 1
            listaTurnos.forEach(turno => {
                if (turno.idTurno == listaTurnosSeleccionados[index].idTurno) {
                    turno.estado = 1; // Restablecer el estado del turno anterior
                }
            });

            // Reemplazar el turno en la lista con el nuevo objeto
                listaTurnosSeleccionados[index] = turnoObj;
        } else {
            // Si no existe, agregamos el nuevo turno
               listaTurnosSeleccionados.push(turnoObj);
        }

        // Actualizamos el estado de los turnos seleccionados en listaTurnos
        listaTurnosSeleccionados.forEach(turnoSeleccionado => {
            listaTurnos.forEach(turno => {
                if (turnoSeleccionado.idTurno == turno.idTurno) {
                    turno.estado = 2; // Cambiar el estado del turno a 2
                }
            });
        });
    console.log(listaTurnos);
    console.log(listaTurnosSeleccionados);
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
//function cancelar turno
function cancelarTurno(e){
    e.preventDefault();
    const turnoEliminar=e.target.dataset.idTurno;
    listaTurnosSeleccionados=listaTurnosSeleccionados.filter(turno =>turno.idTurno!== turnoEliminar);
    listaTurnos.forEach(turno=>{
        if(turno.idTurno==turnoEliminar){
            turno.estado=1;
        }
    })
    mostrarHtml(mascotaObj);
}
//muestra el html
async function mostrarHtml(mascotaObj) {
    switch(estado){
        case 1:
                //limpiar el html que se encuentra
                contenedorResponsivo.innerHTML="";
                if (!contenedorResponsivo.classList.contains('flex-lg-row')) {
                    contenedorResponsivo.classList.add('flex-lg-row');
                }
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
                    if (!contenedorResponsivo.classList.contains('flex-lg-row')) {
                        contenedorResponsivo.classList.add('flex-lg-row');
                    }
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
                if(listaTurnos.length==0){
                    let listaEmpleadosUnicos = listEmpleados.filter((empleado, index, self) => 
                        index === self.findIndex((e) => e.idEmpleado === empleado.idEmpleado)
                    );
                    for (const empleado of listaEmpleadosUnicos) {
                        // Espera a obtener la lista de empleados para cada especialidad
                        const listTurno = await obtenerTurnos(empleado);
                        listaTurnos = [...listaTurnos, ...listTurno];
                    }
                }

                let htmlListaTurnos = "";
                if(contenedorResponsivo.classList.contains('flex-lg-row')){
                    contenedorResponsivo.classList.remove('flex-lg-row');
                }
                htmlListaTurnos += `<div class="formato-contenedor d-flex col-12 col-sm-12 col-lg-12 flex-column">`;
                listEmpleados.forEach(empleado => {
                    const { idTipoServicio, idEmpleado, img, nombreVeterinario, nombreServicio } = empleado;
                                    htmlListaTurnos += `
                                        <div class="d-flex justify-content-around flex-wrap col-12 col-lg-12 flex-column flex-sm-row mb-3">
                                            <div class="col-3 px-4 py-3 d-flex justify-content-center align-items-center bordear-derecha">
                                                <div class="card">
                                                    <div class="w-100 d-flex justify-content-center align-items-center">
                                                        <img src="${img}" class="img-fluid mt-2 img-especialista" alt="Imagen Especialista">
                                                    </div>
                                                    <div class="card-body">
                                                        <h5 class="card-title text-center" data-id-servicio="${idTipoServicio}">Servicio: ${nombreServicio}</h5>
                                                    </div>
                                                    <div class="card-footer text-center">
                                                        <small class="text-muted">${nombreVeterinario}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-8">
                                                <span class="indicacion-mascota pb-3">Seleccione un turno</span>
                                                <div class="d-flex flex-wrap">`; // Inicio del contenedor de tarjetas de turno
                                            
                                            listaTurnos.forEach(turno => {
                                                const { idTurno, fecha, hora, estado, empleado: turnoEmpleado } = turno;
                                                if (idEmpleado == turnoEmpleado.idEmpleado && estado == 1) {
                                                    htmlListaTurnos += `
                                                        <div class="card mt-3 mx-2 card-turno" style="width: 11rem;">
                                                            <div class="card-header" data-id-servicio="${idTipoServicio}" data-id-empleado="${idEmpleado}">
                                                                <span data-id-turno="${idTurno}">Turno disponible</span>
                                                            </div>
                                                            <ul class="list-group list-group-flush" data-servicio-nombre="${nombreServicio}" data-nombre-veterinario="${nombreVeterinario}"
                                                                data-fecha="${fecha}" data-hora="${hora}"
                                                            >
                                                                <li class="list-group-item">Fecha: ${fecha}</li>
                                                                <li class="list-group-item">Hora: ${hora}</li>
                                                            </ul>
                                                        </div>`;
                                                }
                                            });

                                htmlListaTurnos += `
                                            </div> 
                                        </div>
                                    </div>`;
                });
                if(listaTurnosSeleccionados.length>0){
                    htmlListaTurnos +=` <div class="d-flex justify-content-center flex-wrap col-12 col-lg-12 flex-column flex-sm-row mb-3 pt-4">
                                            <div class="contenedor-respuesta col-8">
                                                <span class="alerta-mascota fw-bold fs-3">Turnos seleccionados</span>
                                                    <table class="table table-striped table-hover align-middle">
                                                        <thead>
                                                            <tr>
                                                                <th>Servicio</th>
                                                                <th>Especialista</th>
                                                                <th>Fecha</th>
                                                                <th>Hora</th>
                                                                <th>Cancelar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>    
                    `;
                        listaTurnosSeleccionados.forEach(turno=>{
                                            const {idTurno,nombreServicio,nombreVeterinario,fecha,hora}=turno;
                                            htmlListaTurnos +=`<tr>
                                                                    <td>${nombreServicio}</td>
                                                                    <td>${nombreVeterinario}</td>
                                                                    <td>${fecha}</td>
                                                                    <td>${hora}</td>
                                                                    <td class="text-center"> <a href="#" class="deletTurno"><i class="fa-solid fa-trash-can fa-lg" data-id-turno="${idTurno}"></i></a></td>
                                                               </tr>`
                        });
                            htmlListaTurnos +=`         </tbody>
                                                    </table>
                                            </div>
                                        </div>`
                }
                htmlListaTurnos += `</div>`;
                contenedorResponsivo.innerHTML = htmlListaTurnos;
                    cargarCards();
                    eventos();  
        break;
        case 4:
                contenedorResponsivo.innerHTML="";
                let htmlPago ="";
                if(Object.keys(detalleCliente).length === 0){
                    detalleCliente = await obtenerDetalleCliente(cliente);
                }
                const {nombre_cliente,apellido_cliente,direccion,email,telefono}=detalleCliente;
                htmlPago+=`<div class="form formato-contenedor d-flex col-12 col-sm-12 col-lg-12 flex-row justify-content-around">
                                <div class="col-5 ps-4">
                                    <span class="alerta-mascota fw-bold fs-3">Detalle cita:</span>
                                    <form id="payment-form">
                                    <div class="mb-3">
                                            <label for="txtNombreCliente" class="form-label">Nombre Completo</label>
                                            <input type="text" class="form-control" id="txtNombreCliente" disabled value="${apellido_cliente} ${nombre_cliente}">
                                    </div>
                                        <div class="mb-3">
                                            <label for="txtEmail" class="form-label">Email: </label>
                                            <input type="text" class="form-control" id="txtNombreCliente" disabled value="${email}">
                                    </div>
                                        <div class="mb-3">
                                            <label for="txtTelefono" class="form-label">Direccion: </label>
                                            <input type="text" class="form-control" id="txtTelefono" disabled value="${telefono}">
                                    </div>
                                        <div class="mb-3">
                                            <label for="txtMascota" class="form-label">Mascota: </label>
                                            <input type="text" class="form-control" id="txtMascota" disabled value="${mascotaObj.nombre}">
                                        </div>
                                        </form>
                                </div>
                                <div class="col-5">
                                         <span class="alerta-mascota fw-bold fs-3">Detalle servicios de cita:</span>
                                                    <table class="table table-striped table-hover align-middle">
                                                        <thead>
                                                            <tr>
                                                                <th>Servicio</th>
                                                                <th>Especialista</th>
                                                                <th>Fecha</th>
                                                                <th>Hora</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody> `
                                    listaTurnosSeleccionados.forEach(turno=>{
                                        const {idTurno,nombreServicio,nombreVeterinario,fecha,hora}=turno;
                                        htmlPago +=`<tr>
                                                                <td>${nombreServicio}</td>
                                                                <td>${nombreVeterinario}</td>
                                                                <td>${fecha}</td>
                                                                <td>${hora}</td>
                                                            </tr>`
                                                            });
                               
                                listServicios.forEach(servicio=>{
                                    totalPagar+=Number(servicio.precio);
                                });
                                htmlPago+=`  </tbody>
                                    </table>
                                    <div class="col-12 d-flex justify-content-end pe-3">
                                            <span class="alerta-mascota fw-bold fs-5">Total a pagar: ${totalPagar}</span>
                                    </div>
                                    <span class="alerta-mascota fw-bold fs-3">Metodo de pago:</span>
                                    <div class="col-12 d-flex justify-content-center pe-3 flex-column">
                                        
                                            <div class="form-group col-12 ps-3">
                                                <div class="col-12 d-flex justify-content-around align-items-center">
                                                    <input 
                                                    class="form-check-input rounded-circle p-2 me-2 metodoPago" 
                                                    type="radio" 
                                                    id="pay-paypal" 
                                                    name="payment-method" 
                                                    value="paypal"
                                                    >
                                                    <label for="pay-paypal" class="d-flex align-items-center">
                                                    <span>Pagar con PayPal?</span>
                                                    <img src="img/paypal.jpg" class="ms-2 w-50" alt="Logo de PayPal">
                                                    </label>
                                                </div>
                                             </div>
                                            <div class="col-12 d-flex justify-content-center align-intems-center">
                                                <button type="submit" id="generar-pago" class="btn generar-pago my-3">Prosesar Pago</button>
                                            </div>
                                             <div class="col-12 d-flex justify-content-center align-intems-center">
                                                <div id="paypal-button-container"></div>
                                            </div>
                                           
                                    </div>
                                        
                                </div> 
                            </div>`
                contenedorResponsivo.innerHTML = htmlPago;
                    cargarCards();
                    eventos();
            break;
    }

}

//funciones rest
async function obtenerDetalleCliente(cliente) {
    const {idCliente}=cliente;
    const response= await fetch(`/servicios/cliente/${idCliente}`);
     if (response.ok) {
            const clienteDetalle = await response.json();
            return clienteDetalle;
        } else {
            console.error("Error: Usuario no encontrado");
            return [];
     }
}

async function obtenerTurnos(empleado) {
    const {idEmpleado}=empleado;
    const response= await fetch(`/servicios/turno/empleado/${idEmpleado}`);
     if (response.ok) {
            const turnos = await response.json();
            return turnos;
        } else {
            console.error("Error: Usuario no autenticado");
            return [];
     }
}

async function obtenerIdCliente(){
    const response= await fetch('/servicios/cliente/usuarioSesion');
     if (response.ok) {
            const usuario = await response.json();
            return usuario;
        } else {
            console.error("Error: Cliente no encontrado");
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
                console.error("Error: Empleados no encontrados");
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

function checkout(){
    let selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (selectedPaymentMethod) {
            methodPaid=selectedPaymentMethod.value;
            if(methodPaid == "paypal"){
                /* Declaramos función de paypal*/
                paypal.Buttons({
                    createOrder: function(data, actions) {
                        // Esta función configura los detalles de la transacción, incluido el importe y los detalles de la partida.
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalPagar // El total a pagar
                                }
                            }]
                        });
                    },
                    onApprove: function(data, actions) {
                        
                        // This function captures the funds from the transaction.
                        return actions.order.capture().then(function(details) {
                            
                            if(details.status == "COMPLETED"){
    
                                //Generar la orden en la Base de datos
                                console.log("agregando cita base de datos");
                                window.location.href = "index.html";
                                //newOrder("paypal", "pending", details.id, total);
    
                            }
    
                            return false;
                           
                        });
    
                    },
    
                    onCancel: function (data) {
    
                        mostrarToast("La transacciíon fue cancelada");
                        eventos();
                        return false;
    
                    },
    
                    onError: function (err) {
                        mostrarToast("Ocurrio un error en la transaccion");
                        eventos();
                        return false;
    
                    }
    
    
                }).render('#paypal-button-container');
    
            }else{
                return false;
            }
        }else{
            mostrarToast("No se ha seleccionado ningún método de pago");
        }
    }

