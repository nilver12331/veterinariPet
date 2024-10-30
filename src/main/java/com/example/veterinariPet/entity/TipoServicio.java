package com.example.veterinariPet.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private String descripcion;
    private String img;
    @ManyToOne
    @JoinColumn(name = "idEspecialidad", nullable = false) // Relación con Especialidad
    @JsonBackReference // Rompe la recursión en la serialización
    private Especialidad especialidad;
}
