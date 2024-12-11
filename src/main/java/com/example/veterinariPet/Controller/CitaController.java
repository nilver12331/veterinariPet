package com.example.veterinariPet.controller;

import com.example.veterinariPet.Entity.Cita;
import com.example.veterinariPet.dto.CitaDTO;
import com.example.veterinariPet.service.interfaces.citaServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "servicios/cita")
public class CitaController {
    @Autowired
    private final citaServiceInterface citaService;

    @Autowired
    public CitaController(citaServiceInterface citaService) {
        this.citaService = citaService;
    }

    // Ahora recibes directamente un objeto de tipo Cita
    @PostMapping(value = "/crear", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> crearCita(@RequestBody Cita cita) {
        Cita citaCreada = citaService.guardarCita(cita);
        return ResponseEntity.ok(citaCreada.getIdCita());
    }
    @PostMapping("/por-mascota")
    public ResponseEntity<List<Cita>> obtenerCitasPorMascota(@RequestBody Map<String, Long> payload) {
        Long idMascota = payload.get("idMascota");
        if (idMascota == null) {
            return ResponseEntity.badRequest().build(); // 400 si no se envía el idMascota
        }

        List<Cita> citas = citaService.obtenerCitasPorIdMascota(idMascota);
        if (citas.isEmpty()) {
            return ResponseEntity.noContent().build(); // Devuelve 204 si no hay citas
        }
        return ResponseEntity.ok(citas);
    }
}
