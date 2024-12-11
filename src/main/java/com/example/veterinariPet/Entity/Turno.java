package com.example.veterinariPet.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name="Turnos")
public class Turno {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idTurno;
    private LocalDate fecha;
    private LocalTime hora;
    private int estado;
    // Relación con Empleado: Un turno pertenece a un empleado
    @ManyToOne
    @JoinColumn(name = "idEmpleado", nullable = false)
    @JsonIgnoreProperties("turnos") // Evita recursión infinita al serializar
    private Empleado empleado;
}
