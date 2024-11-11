package com.example.veterinariPet.Entity;

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
    private String img;
    @OneToMany(mappedBy = "especialidad", cascade = CascadeType.ALL) // Relación inversa con TipoServicio
    private List<TipoServicio> servicios; // Lista de servicios asociados
    @OneToMany(mappedBy = "especialidad")
    private List<Empleado> empleados;
}