package com.example.veterinariPet.Service;

import com.example.veterinariPet.Respository.MascotaRepository;
import com.example.veterinariPet.entity.Mascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
