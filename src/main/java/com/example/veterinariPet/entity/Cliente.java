package com.example.veterinariPet.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;



@Data
@jakarta.persistence.Entity
@Table(name="Clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long idCliente;
    private String nombreCliente;
    private String apellidoCliente;
    private String tipoDocumento;
    private String numDocumento;
    private String direccion;
    private String email;
    private String password;
    private String telefono;
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mascota> mascotas;
}
