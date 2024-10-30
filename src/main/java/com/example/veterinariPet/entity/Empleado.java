package com.example.veterinariPet.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Empleados")
public class Empleado {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idEmpleado;
    private String nombreVeterinario;
    private int edad;
    private int teléfono;
    private String img;
    @OneToOne
    @JoinColumn(name = "idEspecialidad", nullable = false)
    private Especialidad especialidad;
}
