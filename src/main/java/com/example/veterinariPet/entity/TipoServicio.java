package com.example.veterinariPet.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="TipoServicios")
public class TipoServicio {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idTipoServicio;
    private String nombreServicio;
    private double costo;
    @ManyToOne
    @JoinColumn(name = "idEspecialidad", nullable = false)
    private Especialidad especialidad;
}
