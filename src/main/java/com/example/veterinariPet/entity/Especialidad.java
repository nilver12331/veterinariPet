package com.example.veterinariPet.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Data
@Entity
@Table(name="Especialidades")
public class Especialidad {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idEspecialidad;
    private String nombreEspecialidad;
    @OneToMany(mappedBy = "especialidad")
    private List<Servicio> servicios;
    @OneToMany(mappedBy = "especialidad")
    private List<Empleado> empleados;
}
