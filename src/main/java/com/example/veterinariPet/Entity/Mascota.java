package com.example.veterinariPet.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="Mascotas")
public class Mascota {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idMascota;
    private String nombre_mascota;
    private double peso;
    private int edad;
    private String genero;
    private String raza;
    private String img;
    @ManyToOne
    @JoinColumn(name = "idCliente") // Esta es la columna de clave foránea
    private Cliente cliente;
    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cita> citas;
}
