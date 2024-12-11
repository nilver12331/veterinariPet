package com.example.veterinariPet.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CitaDTO {
    private Date fecha;
    private String descripcion;
    private long idCliente; // Relación con el cliente
    private long idMascota; // Relación con la mascota
    private double totalPagar;
    private long idMetodoPago; // Relación con el método de pago
    private List<ServicioDTO> servicios; // Lista de servicios asociados
}
