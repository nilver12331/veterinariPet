package com.example.veterinariPet.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="MetodoPagos")
public class MetodoPago {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idPago;
    @OneToOne
    @JoinColumn(name = "cita_id", nullable = false)
    private Cita cita;
    private String metodoPago;
}
