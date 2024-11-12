package com.example.veterinariPet.service;
import com.example.veterinariPet.Entity.Especialidad;
import com.example.veterinariPet.Repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.example.veterinariPet.service.interfaces.especialidadServiceInterface;
@Service
public class EspecialidadService implements  especialidadServiceInterface{
    @Autowired
    EspecialidadRepository especialidadRepository;
    @Override
    public List<Especialidad> getEspecialidades(){
        return especialidadRepository.findAll();
    }
    @Override
    public Optional<Especialidad> getEspecialidad(Long Id){
        return especialidadRepository.findById(Id);
    }
    @Override
    public void saveOrUpdateEspecialidad(Especialidad especialidad){
        especialidadRepository.save(especialidad);
    }
    @Override
    public void deleteEspecialidad(Long Id){
        especialidadRepository.deleteById(Id);
    }
}
