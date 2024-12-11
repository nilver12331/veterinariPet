package com.example.veterinariPet.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "MetodoPagos")
public class MetodoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMetodoPago;
    private String metodoPago;
    @Override
    public int hashCode() {
        return Objects.hash(idMetodoPago); // Solo el ID
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MetodoPago metodoPago = (MetodoPago) o;
        return idMetodoPago == metodoPago.idMetodoPago;
    }
}