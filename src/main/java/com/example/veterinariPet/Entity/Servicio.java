package com.example.veterinariPet.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name="Servicios")
public class Servicio {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idServicio;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "idCita")
    @JsonBackReference  // Evita la recursión infinita con la relación de vuelta a Cita
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "idTipoServicio", nullable = false)
    private TipoServicio tipoServicio;

    // Relación con Turno: Un servicio tiene un único turno
    @ManyToOne
    @JoinColumn(name = "idTurno", nullable = false) // FK hacia Turno
    private Turno turno; // Relación unidireccional a Turno
    @Override
    public int hashCode() {
        return Objects.hash(idServicio); // Solo usa el identificador primario
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Servicio servicio = (Servicio) o;
        return idServicio == servicio.idServicio;
    }
}
