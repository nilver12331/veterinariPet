package com.example.veterinariPet.Controller;

import com.example.veterinariPet.Entity.Especialidad;
import com.example.veterinariPet.service.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios/especialidad")
public class EspecialidadController {
    @Autowired
    private EspecialidadService especialidadService;
    // obtener todas las especialidades
    @GetMapping
    public List<Especialidad> getAllEspecialidades(){
        return  especialidadService.getEspecialidades();
    }
    //Guardar o actualizar especialidad
    @PostMapping
    public void saveOrUpdateEspecialidad(@RequestBody Especialidad especialidad){
        especialidadService.saveOrUpdateEspecialidad(especialidad);
    }
    //Eliminar especialidad
    @DeleteMapping("/{especialidadId}")
    public void deleteEspecialidadPorId(@PathVariable("especialidadId") Long especialidadId) {
        especialidadService.deleteEspecialidad(especialidadId);
    }
}
