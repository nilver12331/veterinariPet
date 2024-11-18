package com.example.veterinariPet.controller;

import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.Entity.Empleado;
import com.example.veterinariPet.service.interfaces.clienteServiceInterface;
import com.example.veterinariPet.service.interfaces.empleadoServiceInterface;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "servicios/empleado")
public class EmpleadoController {
    private final empleadoServiceInterface empleadoService;

    public EmpleadoController(empleadoServiceInterface empleadoService) {
        this.empleadoService = empleadoService;
    }
    @GetMapping("/especialidad/{idEspecialidad}")
    public List<Empleado> getByIdEspecialidad(@PathVariable("idEspecialidad") Long idEspecialidad) {
        return empleadoService.getEmpleadosEspecialidad(idEspecialidad);
    }
    @GetMapping("/images/{filename:.+}")
    public void serveFile(@PathVariable String filename, HttpServletResponse response) {
        String filePath = "src/main/resources/Empleados/" + filename; // Ruta donde se guardan las imágenes
        File file = new File(filePath);
        if (file.exists()) {
            response.setContentType("image/jpeg"); // Cambia a image/png si tus imágenes son PNG
            response.setContentLength((int) file.length());
            try {
                java.nio.file.Files.copy(file.toPath(), response.getOutputStream());
                response.getOutputStream().flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
