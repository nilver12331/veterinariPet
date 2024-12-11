package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Cita;
import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.dto.CitaDTO;

import java.util.List;
import java.util.Optional;

public interface citaServiceInterface {

    Cita guardarCita(Cita cita);
    List<Cita> obtenerCitasPorIdMascota(Long idMascota);
}
