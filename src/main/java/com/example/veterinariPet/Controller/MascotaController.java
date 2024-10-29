package com.example.veterinariPet.Controller;

import com.example.veterinariPet.Service.MascotaService;
import com.example.veterinariPet.entity.Mascota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping(path="l/registromascota")
public class MascotaController {
    @Autowired
    private MascotaService mascoser;
    // que necesito de esos servicios
    // se muestra en nuestra url
    @GetMapping("/all")
    public List<Mascota> getAll(){
        return mascoser.getmasco();
    }
    @PostMapping
    public void saveUpdate(@RequestBody Mascota mascota){
        mascoser.saveOrUpdate(mascota);
    }
    @DeleteMapping("/{mascotaId}")
    public void delete(@PathVariable("mascotaId") Long mascotaId){
        mascoser.delete(mascotaId);
    }

}
