package com.example.veterinariPet.Entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name="Citas")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCita;
    private Date fecha;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idMascota") // Relación unidireccional con Mascota
    /*@JsonManagedReference*/  // Evita la recursión infinita en la serialización
    private Mascota mascota;

    private double totalPagar;

    @OneToMany(mappedBy = "cita", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // Evita la recursión infinita con los servicios
    private List<Servicio> servicios;

    @OneToOne
    @JoinColumn(name = "idMetodoPago") // Relación unidireccional con MetodoPago
    private MetodoPago metodoPago;

    @Override
    public int hashCode() {
        return Objects.hash(idCita); // Solo el ID
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cita cita = (Cita) o;
        return idCita == cita.idCita;
    }
}