package com.example.veterinariPet.Entity;

import jakarta.persistence.*;
import lombok.Data;

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
    private Cita cita;

    @ManyToOne
    @JoinColumn(name = "idTipoServicio", nullable = false)
    private TipoServicio tipoServicio;

    // Relación con Turno: Un servicio tiene un único turno
    @OneToOne
    @JoinColumn(name = "idTurno", nullable = false)
    private Turno turno;  // Relacionamos el servicio con un turno específico
}
