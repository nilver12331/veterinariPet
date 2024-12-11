let listaMascota=[];
let ultimaCita={};
let listaMascotaTotal=[];
let listaCita=[];
const divSelectMascota=document.querySelector('.divSelectMascota');
const divResultadoMascota=document.querySelector('.divResultadoMascota');
document.addEventListener('DOMContentLoaded',async ()=>{
    cliente = await obtenerIdCliente();
    if (cliente) {
        // Si cliente existe, llama a obtenerListaMascota(cliente) y espera su resultado
        listaMascota = await obtenerListaMascota(cliente);
        listaCita=await obtenerListaCita(listaMascota);
        // Mostrar datos solo después de cargar citas
            mostrarUltimaCitaHtml();
            mostrarHtml();
    } else {
        window.location.href="../login.html";
        return;
    }
})
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


async function obtenerListaCita(listMascota){
    let listaCitaTemporal = [];  // Lista temporal para almacenar las citas
    for (let mascota of listMascota) {
        const { idMascota } = mascota;
        try {
            const res = await fetch('http://localhost:8080/servicios/cita/por-mascota', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idMascota })
            });

            if (!res.ok) {
                throw new Error(`Error en el envío de información para la mascota ${idMascota}`);
            }

            const text = await res.text(); // Obtenemos el cuerpo de la respuesta como texto

            if (text) { 
                const data = JSON.parse(text); // Parseamos solo si el cuerpo no está vacío
                if (data.length > 0) {
                    listaCitaTemporal = [...listaCitaTemporal, ...data]; // Añadimos las citas de la mascota actual
                } else {
                    console.log(`No hay citas para la mascota con ID ${idMascota}.`);
                }
            } else {
                console.log(`Respuesta vacía para la mascota con ID ${idMascota}.`);
            }
        } catch (error) {
            console.error(`Error procesando la mascota con ID ${idMascota}:`, error);
        }
    }

    // Al finalizar el ciclo, retornamos la lista de citas completa
    return listaCitaTemporal;
}
function mostrarUltimaCitaHtml(){
    if (listaCita.length > 0) {
        // Encuentra la última cita usando reduce
        const ultimaCita = listaCita.reduce((ultima, citaActual) => {
            return new Date(ultima.fecha) > new Date(citaActual.fecha) ? ultima : citaActual;
        });
        const {servicios}=ultimaCita;
        console.log("Última cita:", ultimaCita);
        const ultimaCitaDiv=document.querySelector('.ultimaCita');
        let ultimoCitaHtml="";
        ultimaCitaDiv.innerHTML="";
        ultimoCitaHtml+=`
            <div class="col-12">
                    <span class="d-flex justify-content-start spanUltimaCita">Ultima Cita realizada</span>
            </div>
            <div class="col-12 d-flex justify-content-around">
                <div class="col-12 col-sm-8 col-lg-3 me-2">
                    <div class="card justify-content-center">
                        <div class="card-header color-header-mascota text-center">
                            Cita: VTRP-${ultimaCita.idCita}
                        </div>
                        <div class="card-body text-center">
                              <li class="list-group-item">Nombre: ${ultimaCita.mascota.nombre_mascota}</li> 
                            <img src="/l/registromascota/images/${ultimaCita.mascota.img}" class="img-fluid imagenMascota mt-2" alt="imagen mascota">
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item fw-bold text-center">Descripción Cita</li>
                            <li class="list-group-item ps-2">Fecha creación: ${formatearFechaPeru(ultimaCita.fecha)}</li>
                            <li class="list-group-item ps-2">Precio: S/${ultimaCita.totalPagar}</li>
                             <li class="list-group-item ps-2">Metodo de pago: ${ultimaCita.metodoPago.metodoPago}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-8 col-lg-9">
                    <div class="card justify-content-center table-container">
                            <div class="card-header color-header-mascota text-center">
                                            Descripción de citas
                            </div>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Especialidad</th>
                                        <th>Servicio</th>
                                        <th>Especialista</th>
                                        <th>Precio</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>    
                        `;
                if(servicios.length>0){
                    servicios.forEach(servicio=>{
                        const {turno,tipoServicio}=servicio;
                        const {empleado}=turno;
                        const {especialidad}=empleado;
                        let nombreEstado="";
                        switch(turno.estado){
                            case 1:
                                    nombreEstado="Disponible"    
                            break;
                            case 2:
                                    nombreEstado="Pendiente"
                            break;
                            case 3:
                                    nombreEstado="En progreso"
                            break;
                            case 4:
                                    nombreEstado="Terminado"
                            break;   
                            default:
                                    nombreEstado="No edintificado" 

                        } 
                        ultimoCitaHtml+=`
                            <tr>
                                <th> 
                                    ${especialidad.nombreEspecialidad}                                
                                </th>
                                <th>
                                    <img src="imgEspecialidades/${tipoServicio.img}" alt="img Servicio" class="img-descripcion">
                                    ${tipoServicio.nombreServicio}
                                </th>
                                <th>
                                     <img src="/servicios/empleado/images/${empleado.img}" alt="especialista" class="img-descripcion">
                                     ${empleado.nombreVeterinario}
                                </th>
                                <th>
                                    S/${tipoServicio.costo}
                                </th>
                                <th>
                                    ${turno.fecha}
                                </th>
                                <th>
                                    ${turno.hora}
                                </th>
                                <th>
                                   <span class="span${nombreEstado}">${nombreEstado}</span>
                                </th>
                            </tr>
                            `;
                    })
                
                 
                }   
              ultimoCitaHtml+=`</tbody>
                            </table>
                    </div>  
                </div>
            </div>
        `;
        ultimaCitaDiv.innerHTML=ultimoCitaHtml;
    } else {
        console.log("No hay citas disponibles.");
    }
}

function mostrarHtml(){
    let historialHtml="";
    divSelectMascota.innerHTML="";
    if(listaMascota.length>0){
        historialHtml+=`<div class="mt-4">
                            <h4>Seleccione una mascota para ver su hitorial de citas:</h4>
                        </div>`
        historialHtml+=`<select class="form-select" aria-label="select de mascotas" id="selectMascota">
                        <option selected>Selecciona una mascota</option>
        `;
                            
                listaMascota.forEach(mascota=>{
                const {idMascota,nombre_mascota}=mascota;
                historialHtml+=`<option value="${idMascota}">${nombre_mascota}</option>`;
                
            })    
        historialHtml+=`</select>`;
        divSelectMascota.innerHTML=historialHtml;
        console.log("despues de manipular mostrarHtml, listaCita:", listaCita);
        eventos();
    }else{
        const alerta=document.createElement('h3');
        alerta.textContent="Usted no tiene registrado a ninguna mascota aun";
        divSelectMascota.appendChild(alerta);
    }
}
function eventos(){
    const selectMascota=document.querySelector('#selectMascota');
    selectMascota.addEventListener('change',(e) =>{
            mostrarResultadoHtml(Number(e.target.value));
    });
}
function mostrarResultadoHtml(e){
    console.log(e);
    let citasSeleccionadasHTML="";
    divResultadoMascota.innerHTML="";
    if( listaCita && listaCita.length>0){
        let listaCitaFiltrada=[];
        listaCita.forEach(cita=>{
            const {mascota}=cita;
            console.log(mascota);
            console.log(e);
            if(mascota.idMascota==e){
                listaCitaFiltrada=[...listaCitaFiltrada,cita];
            }
        })
        listaCitaFiltrada.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        if(listaCitaFiltrada.length>0){
        citasSeleccionadasHTML+=`<div class="accordion" id="accordionPanelsStayOpenExample">`;

            listaCitaFiltrada.forEach(citaf=>{
                const {idCita,mascota,totalPagar,servicios,fecha}=citaf;
                citasSeleccionadasHTML+=`
                                        <div class="accordion-item">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button btnDetalleCita" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${idCita}" aria-expanded="false" aria-controls="panelsStayOpen-collapse${idCita}">
                                                    <div class="col-12 d-flex justify-content-around">
                                                        <div class="col-3"> 
                                                            Cita: VTRP-${idCita}
                                                        </div>
                                                        <div class="col-3">
                                                            Mascota: ${mascota.nombre_mascota}
                                                        </div>
                                                        <div class="col-3">
                                                            Precio Cita: ${totalPagar}
                                                        </div>
                                                        <div class="col-3">
                                                            Fecha de solicitud: ${formatearFechaPeru(fecha)}
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapse${idCita}" class="accordion-collapse collapse">
                                                <div class="accordion-body"> 
                                                     <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Especialidad</th>
                                                                <th>Servicio</th>
                                                                <th>Especialista</th>
                                                                <th>Precio</th>
                                                                <th>Fecha</th>
                                                                <th>Hora</th>
                                                                <th>Estado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>`;
                                        if(servicios.length>0){
                                            servicios.forEach(servicio=>{
                                                            const {turno,tipoServicio}=servicio;
                                                            const {empleado}=turno;
                                                            const {especialidad}=empleado;
                                                            let nombreEstado="";
                                                            switch(turno.estado){
                                                                case 1:
                                                                        nombreEstado="Disponible"    
                                                                break;
                                                                case 2:
                                                                        nombreEstado="Pendiente"
                                                                break;
                                                                case 3:
                                                                        nombreEstado="En progreso"
                                                                break;
                                                                case 4:
                                                                        nombreEstado="Terminado"
                                                                break;   
                                                                default:
                                                                        nombreEstado="No edintificado" 
                                    
                                                            }
                                citasSeleccionadasHTML+=`   <tr>
                                                                <th> 
                                                                    ${especialidad.nombreEspecialidad}                                
                                                                </th>
                                                                <th>
                                                                    <img src="imgEspecialidades/${tipoServicio.img}" alt="img Servicio" class="img-descripcion">
                                                                    ${tipoServicio.nombreServicio}
                                                                </th>
                                                                <th>
                                                                    <img src="/servicios/empleado/images/${empleado.img}" alt="especialista" class="img-descripcion">
                                                                    ${empleado.nombreVeterinario}
                                                                </th>
                                                                <th>
                                                                    S/${tipoServicio.costo}
                                                                </th>
                                                                <th>
                                                                    ${turno.fecha}
                                                                </th>
                                                                <th>
                                                                    ${turno.hora}
                                                                </th>
                                                                <th>
                                                                <span class="span${nombreEstado}">${nombreEstado}</span>
                                                                </th>
                                                            </tr>`             
                                                })
                                                
                                                }
                                            citasSeleccionadasHTML+=`</tbody>
                                                    </table>` 
                                  citasSeleccionadasHTML+=`
                                                </div>
                                            </div>
                                        </div>`
        
                        });
      citasSeleccionadasHTML+=  `</div>`;
                divResultadoMascota.innerHTML=citasSeleccionadasHTML;
                validarAcordion();
            }else{
                    divResultadoMascota.innerHTML="";
                    divResultadoMascota.innerHTML=`
                        <h4>La mascota no tienes citas registradas</h4>
                    `;
                }

        }else{
            divResultadoMascota.innerHTML="";
            divResultadoMascota.innerHTML=`
                <h4>La mascota no tienes citas registradas</h4>
            `;
        }
   
    }
function validarAcordion(){
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.classList.add('collapsed');
        button.setAttribute('aria-expanded', 'false');
    });

    const accordionContents = document.querySelectorAll('.accordion-collapse');
    accordionContents.forEach(content => {
        content.classList.remove('show');
    });
}

function formatearFechaPeru(fechaUTC) {
    // Convertir la fecha de la base de datos a un objeto Date
    const fecha = new Date(fechaUTC);

    // Opciones de formato para mostrar la fecha local de Perú
    const opciones = {
        timeZone: 'America/Lima', // Zona horaria de Perú
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Formato de 12 horas
    };

    // Formatear la fecha
    return fecha.toLocaleString('es-PE', opciones);
}
