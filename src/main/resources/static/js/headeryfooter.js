const header = document.querySelector("header");
const footer = document.querySelector("footer");

header.innerHTML = `
<link rel="stylesheet" href="css/headeryfooter.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Custom Styles -->
<link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" class="rel">
<header class="header">
     <div class="logo">
     <a href="index.html"><img src="img/logof.png" alt="logo de la veterinaria"></a>
     </div>
<nav class="nav">
    <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="servicios.html">Service</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li class="login">
        <div class="dropdown" id="loginDropdown">
            <a href="login.html" id="loginIcon">
                <img src="img/user.png" alt="logo usuario">
            </a>
            <div class="dropdown-menu dropdown-menu-end" id="userMenu">
                 <a class="dropdown-item" href="PerfilCliente.html">Perfil de cliente</a>
                 <a class="dropdown-item" href="ModificarCliente.html">Modificar Datos</a>
                 <hr class="dropdown-divider">
                 <a class="dropdown-item" href="listarMascotas.html" id="logout">Ver Mascotas</a>
                 <a class="dropdown-item" href="RegistroMascota.html" id="logout">Registrar Mascotas</a>
            </div>
        </div>
        </li>
    </ul>
</nav>
 </header>
`;

footer.innerHTML = `
     <!-- Footer Start-->
     <div class="footer-area footer-padding">
         <div class="container">
             <div class="row d-flex justify-content-between">
                 <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                     <div class="single-footer-caption mb-50">
                         <div class="single-footer-caption mb-30">
                             <!-- logo -->
                             <div class="footer-logo mb-25">
                                 <a href="index.html"><img src="img/logof.png" alt=""></a>
                             </div>
                             <!-- social -->
                             <div class="footer-social">
                                 <a href="https://www.facebook.com/sai4ull"><i class="fab fa-facebook-square"></i></a>
                                 <a href="#"><i class="fab fa-twitter-square"></i></a>
                                 <a href="#"><i class="fab fa-linkedin"></i></a>
                                 <a href="#"><i class="fab fa-pinterest-square"></i></a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="col-xl-2 col-lg-2 col-md-4 col-sm-5">
                     <div class="single-footer-caption mb-50">
                         <div class="footer-tittle">
                             <h4>Company</h4>
                             <ul>
                                 <li><a href="index.html">Home</a></li>
                                 <li><a href="single-blog.html">Services</a></li>
                                 <li><a href="contact.html">  Contact Us</a></li>
                             </ul>
                         </div>
                     </div>
                 </div>
                 <div class="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                     <div class="single-footer-caption mb-50">
                         <div class="footer-tittle">
                             <h4>Services</h4>
                             <ul>
                                 <li><a href="#">Consulta general</a></li>
                                 <li><a href="#">Vacunaciones</a></li>
                                 <li><a href="#">Cirugía</a></li>
                                 <li><a href="#">Diagnóstico</a></li>
                                 <li><a href="#">Servicios de peluquería</a></li>
                             </ul>
                         </div>
                     </div>
                 </div>
                 <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                     <div class="single-footer-caption mb-50">
                         <div class="footer-tittle">
                             <h4>Get in Touch</h4>
                             <ul>
                                 <li><a href="#">152-515-6565</a></li>
                                 <li><a href="#"> Demomail@gmail.com</a></li>
                                 <li><a href="#">New Orleans, USA</a></li>
                             </ul>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
`;

document.addEventListener("DOMContentLoaded", function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const loginDropdown = document.getElementById("loginDropdown");
    const userMenu = document.getElementById("userMenu");

    // Verificar si hay sesión activa
    if (nombreUsuario) {
        loginDropdown.classList.add("session-active");  // Añade una clase si hay sesión
    }

    // Evento para cerrar sesión
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('nombreUsuario');
        window.location.href = "/index.html";  // Redirigir al login
    });
});
