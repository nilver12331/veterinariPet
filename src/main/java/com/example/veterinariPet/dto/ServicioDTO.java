package com.example.veterinariPet.dto;

import lombok.Data;

@Data
public class ServicioDTO {
    private String descripcion;
    private long idTipoServicio; // ID del tipo de servicio
    private long idTurno;        // ID del turno asociado
}
