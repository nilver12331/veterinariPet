package com.example.veterinariPet.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.Objects;


@Data
@Entity
@Table(name = "Clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCliente;
    private String nombre_cliente;
    private String apellido_cliente;
    private String tipo_Documento;
    private String numero_Documento;
    private String direccion;
    private String email;
    private String contraseña;
    private String telefono;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // Indica el lado principal de la relación
    private List<Mascota> mascotas; // Relación unidireccional: Cliente conoce sus Mascotas
    @Override
    public int hashCode() {
        return Objects.hash(idCliente); // Solo el ID
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente cliente = (Cliente) o;
        return idCliente == cliente.idCliente;
    }
}