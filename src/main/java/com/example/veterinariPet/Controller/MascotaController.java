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
    @GetMapping
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

    @PostMapping
    public void saveUpdate(@RequestParam("mascota") Mascota mascota, @RequestParam("imagen") MultipartFile imagen) {
        try {
            String imageName = mascoser.saveImage(imagen); // Guarda la imagen
            mascota.setImg(imageName); // Asigna el nombre de la imagen a la mascota
            mascoser.saveOrUpdate(mascota);
        } catch (IOException e) {
            // Manejar la excepción (ej. devolver un mensaje de error)
            e.printStackTrace();
        }
    }
}
