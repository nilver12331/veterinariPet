package com.example.veterinariPet.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="Citas")
public class Cita {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idCita;
    private String numCita;
    private Date fecha;
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "idMascota")
    private Cliente cliente;
    @ManyToOne
    @JoinColumn(name = "idCliente")
    private Mascota mascota;
    private double totalPagar;
    @OneToMany(mappedBy = "cita", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Servicio> servicios;
    @OneToOne(mappedBy = "cita")
    private MetodoPago metodoPago;
}
