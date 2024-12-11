package com.example.veterinariPet.service;

import com.example.veterinariPet.Entity.*;
import com.example.veterinariPet.Repository.*;
import com.example.veterinariPet.dto.CitaDTO;
import com.example.veterinariPet.service.interfaces.citaServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CitaService implements citaServiceInterface {
    @Autowired
    private CitaRepository citaRepository;
    @Autowired
    private MetodoPagoRepository metodoPagoRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private MascotaRepository mascotaRepository;
    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private TipoServicioRepository tipoServicioRepository;
    @Autowired
    private TurnoRepository turnoRepository;

    @Transactional
    public Cita guardarCita(Cita cita) {
        // Asignar Método de Pago
        MetodoPago metodoPago = metodoPagoRepository.findById(cita.getMetodoPago().getIdMetodoPago())
                .orElseThrow(() -> new EntityNotFoundException("Método de pago no encontrado"));
        cita.setMetodoPago(metodoPago);

        // Asignar Mascota
        Long idMascota = cita.getMascota().getIdMascota();
        Mascota mascota = mascotaRepository.findById(idMascota)
                .orElseThrow(() -> new EntityNotFoundException("Mascota no encontrada"));

        // Verificar que la mascota pertenece al cliente
        if (mascota.getCliente() == null) {
            throw new EntityNotFoundException("La mascota no tiene cliente asociado.");
        }
        cita.setMascota(mascota);

        // Guardar la cita (con los datos ya completos)
        Cita citaGuardada = citaRepository.save(cita);

        // Crear y guardar los servicios asociados
        List<Servicio> servicios = new ArrayList<>();
        for (Servicio servicio : cita.getServicios()) {
            servicio.setCita(citaGuardada);  // Asociar cada servicio con la cita guardada

            // Asignar TipoServicio y Turno
            TipoServicio tipoServicio = tipoServicioRepository.findById(servicio.getTipoServicio().getIdTipoServicio())
                    .orElseThrow(() -> new EntityNotFoundException("Tipo de servicio no encontrado"));
            servicio.setTipoServicio(tipoServicio);

            Turno turno = turnoRepository.findById(servicio.getTurno().getIdTurno())
                    .orElseThrow(() -> new EntityNotFoundException("Turno no encontrado"));
            servicio.setTurno(turno);

            // Actualizar el estado del turno (solo si corresponde)
            turno.setEstado(2);  // Asumiendo 1 es el estado 'Confirmado', 2 podría ser otro estado
            turnoRepository.save(turno);

            servicios.add(servicio);  // Agregar el servicio a la lista
        }

        // Guardar los servicios asociados a la cita
        servicioRepository.saveAll(servicios);

        // Actualizar la cita con los servicios asociados
        citaGuardada.setServicios(servicios);

        // Finalmente, persistir la cita completa con los servicios ya vinculados
        return citaRepository.save(citaGuardada);
    }

    public List<Cita> obtenerCitasPorIdMascota(Long idMascota){
        return citaRepository.findByMascotaIdMascota(idMascota);
    }
}
