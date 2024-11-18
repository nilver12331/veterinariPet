package com.example.veterinariPet.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="Empleados")
public class Empleado {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idEmpleado;
    private String nombreVeterinario;
    private int edad;
    private int telefono;
    private String img;
    @ManyToOne
    /*@JsonBackReference  // Indica el lado inverso de la relación*/
    @JoinColumn(name = "idEspecialidad", nullable = false)
    @JsonIgnoreProperties({"empleados", "servicios"}) // Evita recursión e incluye solo idEspecialidad
    private Especialidad especialidad;

    // Relación con Turno: Un empleado tiene muchos turnos
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("empleado") // Para evitar recursión infinita al serializar
    private List<Turno> turnos;
}
