package com.example.veterinariPet.service;

import com.example.veterinariPet.Entity.Mascota;
import com.example.veterinariPet.Repository.MascotaRepository;
import com.example.veterinariPet.Entity.Mascota;
import com.example.veterinariPet.service.interfaces.mascotaServiceInterface;
import com.example.veterinariPet.Repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MascotaService implements mascotaServiceInterface{

    @Autowired
    MascotaRepository mascotarepo;
    @Override
    public List<Mascota> getmasco(){
        return mascotarepo.findAll();
    }
    //metodo opcinal, puede que pase como q no
    @Override
    public void saveOrUpdate(Mascota mascota){
        mascotarepo.save(mascota);
    }
    @Override
    public void delete(Long id){
        mascotarepo.deleteById(id);
    }
    @Override
    public List<Mascota> getMascotasCliente (Long idCliente){
        return mascotarepo.findByClienteIdCliente(idCliente);
    }
    @Override
    public Mascota obtenerPorId(Long id) {
        return mascotarepo.findById(id).orElse(null);
    }
}
