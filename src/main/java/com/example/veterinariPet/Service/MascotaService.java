package com.example.veterinariPet.service;

import com.example.veterinariPet.entity.Mascota;
import com.example.veterinariPet.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MascotaService {

    @Autowired
    MascotaRepository mascotarepo;
    public List<Mascota> getmasco(){
        return mascotarepo.findAll();

    }
    //metodo opcinal, puede que pase como q no

    public void saveOrUpdate(Mascota mascota){
        mascotarepo.save(mascota);
    }
    public void delete(Long id){
        mascotarepo.deleteById(id);
    }


}
