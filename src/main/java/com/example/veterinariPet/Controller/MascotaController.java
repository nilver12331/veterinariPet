package com.example.veterinariPet.Controller;

import com.example.veterinariPet.Service.MascotaService;
import com.example.veterinariPet.Entity.Mascota;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
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
    public String saveUpdate(@RequestParam("txt-nombrem") String nombre,
                             @RequestParam("peso") String peso,
                             @RequestParam("edad") String edad,
                             @RequestParam("genero") String genero,
                             @RequestParam("raza") String raza,
                             @RequestParam("imagen") MultipartFile imagen, HttpServletResponse httpServletResponse) {
        // Definir la ruta donde se guardará la imagen
        String uploadDir = "src/main/resources/uploadimg/";
        String fileName = imagen.getOriginalFilename();
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // Crea el directorio si no existe
        }

        // Guardar la imagen
        try {
            imagen.transferTo(Paths.get(uploadDir + fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al guardar la imagen";
        }

        // Crear un objeto de mascota
        Mascota mascota = new Mascota();
        mascota.setNombre_mascota(nombre);
        // Convertir peso de String a double
        try {
            double pesoDouble = Double.parseDouble(peso); // Convertir a double
            mascota.setPeso(pesoDouble);
        } catch (NumberFormatException e) {
            return "Error: Peso debe ser un número válido";
        }

        // Convertir edad de String a int
        try {
            int edadInt = Integer.parseInt(edad); // Convertir a int
            mascota.setEdad(edadInt);
        } catch (NumberFormatException e) {
            return "Error: Edad debe ser un número válido";
        }
        mascota.setGenero(genero);
        mascota.setRaza(raza);
        mascota.setImg(fileName); // Guarda el nombre de la imagen

        // Guardar la mascota en la base de datos
        mascoser.saveOrUpdate(mascota);

        return "redirect:index.html";
    }
    @DeleteMapping("/{mascotaId}")
    public void delete(@PathVariable("mascotaId") Long mascotaId){
        mascoser.delete(mascotaId);
    }

    @GetMapping("/images/{filename:.+}")
    public void serveFile(@PathVariable String filename, HttpServletResponse response) {
        String filePath = "src/main/resources/uploadimg/" + filename; // Ruta donde se guardan las imágenes
        File file = new File(filePath);
        if (file.exists()) {
            response.setContentType("image/jpeg"); // Cambia a image/png si tus imágenes son PNG
            response.setContentLength((int) file.length());
            try {
                java.nio.file.Files.copy(file.toPath(), response.getOutputStream());
                response.getOutputStream().flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

}
