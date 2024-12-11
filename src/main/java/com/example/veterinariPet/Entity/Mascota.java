package com.example.veterinariPet.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "Mascotas")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMascota;
    private String nombre_mascota;
    private double peso;
    private int edad;
    private String genero;
    private String raza;
    private String img;

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false) // Relación con Cliente
    @JsonBackReference  // Evita la recursión infinita al serializar Mascota -> Cliente
    private Cliente cliente;

    @Override
    public int hashCode() {
        return Objects.hash(idMascota); // Solo el ID
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Mascota mascota = (Mascota) o;
        return idMascota == mascota.idMascota;
    }
}