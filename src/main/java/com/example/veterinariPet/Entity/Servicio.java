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
    @OneToOne
    @JoinColumn(name = "idTipoServicio")
    private TipoServicio tipoServicio;
}
