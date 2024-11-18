package com.example.veterinariPet.service.interfaces;

import com.example.veterinariPet.Entity.Mascota;

import java.util.List;

public interface mascotaServiceInterface {
    List<Mascota> getmasco();
    void saveOrUpdate(Mascota mascota);
    void delete(Long id);
    List<Mascota> getMascotasCliente (Long idCliente);
}
