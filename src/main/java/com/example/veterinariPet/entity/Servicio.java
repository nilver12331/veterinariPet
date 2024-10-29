package com.example.veterinariPet.entity;

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
    @ManyToOne
    @JoinColumn(name = "especialidad_id")  // or whatever column name is correct
    private Especialidad especialidad;
}
