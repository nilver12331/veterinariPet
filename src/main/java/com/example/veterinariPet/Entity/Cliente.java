package com.example.veterinariPet.Entity;

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
    private String nombre_cliente;
    private String apellido_cliente;
    private String tipo_Documento;
    private String numero_Documento;
    private String direccion;
    private String email;
    private String contraseña;
    private String telefono;
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mascota> mascotas;
}
