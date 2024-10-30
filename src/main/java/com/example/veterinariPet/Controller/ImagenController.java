package com.example.veterinariPet.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/imagenes")
public class ImagenController {
    // Cambia la ruta a la que necesitas
    private static final String UPLOAD_DIR = "C:/Users/Usuario/Desktop/integradorpy/veterinariPet/uploadimg/";

    @PostMapping("/subir")
    public ResponseEntity<String> subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            // Crear directorio si no existe
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Guardar el archivo en el directorio
            Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok("Archivo subido exitosamente: " + file.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir el archivo: " + e.getMessage());
        }
    }
}
