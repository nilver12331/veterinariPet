package com.example.veterinariPet.controller;
import com.example.veterinariPet.Entity.Cliente;
import com.example.veterinariPet.Entity.Mascota;
import com.example.veterinariPet.service.interfaces.mascotaServiceInterface;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="l/registromascota")
public class MascotaController {
    @Autowired
    private  final mascotaServiceInterface  mascoser;
    @Autowired
    public MascotaController(mascotaServiceInterface mascoser){
        this.mascoser=mascoser;
    }
    // private MascotaService mascoser;
    // que necesito de esos servicios
    // se muestra en nuestra url
    @GetMapping("/all")
    public List<Mascota> getAll(){
        return mascoser.getmasco();
    }
    @PostMapping
    public String saveUpdate(@RequestParam("id-usuario") String idCliente,
                            @RequestParam("txt-nombrem") String nombre,
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
        // Convertir edad de String a Long
        try {
            long idClient = Long.parseLong(idCliente); // Convertir a long
            Cliente cliente=new Cliente();
            cliente.setIdCliente(idClient);
            mascota.setCliente(cliente);
        } catch (NumberFormatException e) {
            return "Error: Edad debe ser un número válido";
        }
        mascota.setGenero(genero);
        mascota.setRaza(raza);
        mascota.setImg(fileName); // Guarda el nombre de la imagen
        // Guardar la mascota en la base de datos
        mascoser.saveOrUpdate(mascota);
        return "redirect:/index.html";
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
    @GetMapping("/cliente/{idCliente}")
    public List<Mascota> getMascotaClienteId(@PathVariable Long idCliente){
        return mascoser.getMascotasCliente(idCliente);
    }
    @PutMapping("/{idMascota}")
    public ResponseEntity<?> updateMascota(
            @PathVariable Long idMascota,
            @RequestParam("nombre") String nombre,
            @RequestParam("peso") double peso,
            @RequestParam("edad") int edad,
            @RequestParam("genero") String genero,
            @RequestParam("raza") String raza,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen
    ) {
        Optional<Mascota> mascotaOptional = mascoser.getmasco().stream().filter(m -> m.getIdMascota() == idMascota).findFirst();
        if (mascotaOptional.isPresent()) {
            Mascota mascota = mascotaOptional.get();
            mascota.setNombre_mascota(nombre);
            mascota.setPeso(peso);
            mascota.setEdad(edad);
            mascota.setGenero(genero);
            mascota.setRaza(raza);

        /*if (imagen != null && !imagen.isEmpty()) {
            String uploadDir = "src/main/resources/uploadimg/";
            String fileName = imagen.getOriginalFilename();
            try {
                imagen.transferTo(Paths.get(uploadDir + fileName));
                mascota.setImg(fileName);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen");
            }
        }*/

            mascoser.saveOrUpdate(mascota);
            return ResponseEntity.ok("Mascota actualizada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mascota no encontrada");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Mascota> getMascotaById(@PathVariable Long id) {
        Mascota mascota = mascoser.obtenerPorId(id);
        if (mascota != null) {
            return ResponseEntity.ok(mascota);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
