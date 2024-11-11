const listaServicios =document.querySelector('#lista-servicios');
let listServicios=[]
//mostrar los cursos desde local store
document.addEventListener('DOMContentLoaded',()=>{
    listServicios=JSON.parse(localStorage.getItem('servicio')) || [];
    serviciosHtml();
    cargarEventosListener();
});
function cargarEventosListener(){
   setTimeout(()=>{
    if (listaServicios) {
           listaServicios.addEventListener('click', agregarServicio);
       }
       //eliminar servicio
       const caServicio=document.querySelector('#servicios');
       if(caServicio){
         caServicio.addEventListener('click',eliminarServicio);
       }
       //vaciar servicio
       const vaciarTablaServicio=document.querySelector('#vaciar-tabla');
       if(vaciarTablaServicio){
           vaciarTablaServicio.addEventListener('click',()=>{
               listServicios=[];
               serviciosHtml();
           })
       }
       //validar servico
       const btngenerarCita=document.querySelector('#generar-cita');
       if(btngenerarCita){
           btngenerarCita.addEventListener('click',validarCita);
       }
   },100);
}

//function valida si el usuario dio click en el boton agregar-servicio
function agregarServicio(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-servicio')){
        const servicioSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatos(servicioSeleccionado);
    }
}
//eliminar servicio
function eliminarServicio(e){
    if(e.target.classList.contains('borrar-servicio')){
        const servicioID=e.target.getAttribute('data-id');
        //eliminar servicio
        listServicios=listServicios.filter(servicio => servicio.id!==servicioID);
        serviciosHtml();    
  }
}

//leemos el contenido html del servicio que dimos click
function leerDatos(servicio){
    console.log(servicio.querySelector('span').textContent);
    const infoServicio={
        id:servicio.querySelector('h5').dataset.servicioId,
        img:servicio.querySelector('img').src,
        especialidad:servicio.querySelector('h5').dataset.especialidadNombre,
        nombre:servicio.querySelector('h5').textContent,
        precio:servicio.querySelector('span').textContent
    }
    //revisar si el servicio existe
    const  existe=listServicios.some(servicio=>servicio.id==infoServicio.id);
    if(existe){
        mostrarToast('El servicio seleccionado ya fue seleccionado');
    }else{
         //agregar servicio a lista de servicios
         listServicios=[...listServicios,infoServicio];
         mostrarToast('Se agrego correctamente el servicio');
    }
    serviciosHtml();
}
function serviciosHtml(){
    limpiarServicios();
    const tablaServicio=document.querySelector('#tabla-servicio tbody');
    if(tablaServicio){
        listServicios.forEach(servicio=>{
                const {id,img,especialidad,nombre,precio}=servicio;
                const row=document.createElement('tr');
                row.innerHTML=`
               <td>
                <img src="${img}" width="100">
               </td>
                <td>
                    ${especialidad}
                </td>
                <td>
                ${nombre}
                </td>
                <td>
                ${precio}
                </td>
                <td>
                    <a href="#" class="borrar-servicio"  data-id="${id}">X</a>
                </td>
                `;
                tablaServicio.appendChild(row);
    }) }
    //sincronizar con el localStorage
    sincronizarLocalStore();
}

function sincronizarLocalStore(){
    localStorage.setItem('servicio',JSON.stringify(listServicios));
}

function limpiarServicios(){
     //  contenedorServicio.innerHTML='';
     const tablaServicio=document.querySelector('#tabla-servicio tbody');
     if(tablaServicio){
       while(tablaServicio.firstChild){
                 tablaServicio.removeChild(tablaServicio.firstChild);
             }
     }

}
//Mostrar el toast

function validarCita(){
    if(listServicios.length>0){
        // Guarda listServicios en localStorage antes de redirigir
        window.location.href = 'generarCita.html';
    }else{
        
        // Muestra el toast antes de redirigir a servicios.html
        mostrarToast('Debe seleccionar al menos un servicio para generar una cita');
        // Retrasa la redirección para dar tiempo a que el toast se muestre
        setTimeout(() => {
            window.location.href = 'servicios.html';
        }, 2000);
    }
}

//Funcion permite mostar el toast en funcion a un mensaje enviado
function mostrarToast(mensaje) {
    // Crear un nuevo div para el toast
    const toastDiv = document.createElement('div');
    toastDiv.classList.add('toast');
    toastDiv.setAttribute('role', 'alert');
    toastDiv.setAttribute('aria-live', 'assertive');
    toastDiv.setAttribute('aria-atomic', 'true');
    // Estructura del toast
    toastDiv.innerHTML = `
        <div class="toast-header bg-danger text-white">
            <strong class="me-auto">App Servicio</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${mensaje}</div>
    `;
    // Añadir el nuevo toast al contenedor
    const toastContainer = document.querySelector('.toast-container');
    if(toastContainer){
        toastContainer.appendChild(toastDiv);
        // Crear y mostrar el toast
        const toast = new bootstrap.Toast(toastDiv);
        toast.show();
        // Eliminar el toast después de un tiempo (opcional)
        setTimeout(() => {
            toast.hide();
            // Esperar a que el toast termine de ocultarse antes de eliminarlo del DOM
            toastDiv.addEventListener('hidden.bs.toast', () => {
                toastDiv.remove();
            });
        }, 3000); // Cambia este valor según el tiempo que quieras que el toast esté visible
    }
}

