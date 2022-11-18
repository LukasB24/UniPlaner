package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecturer;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.DuplicateEmailException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILecturerController;
import de.digitra.uniplaner.service.LecturerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/lecturers")
public class LecturerController implements ILecturerController {
    @Autowired
    private LecturerService lecturerService;
   

    @Override
    public ResponseEntity<Lecturer> createLecturer(Lecturer lecturer) throws BadRequestException, DuplicateEmailException {
        if(lecturer.getId() != null) {
            throw new BadRequestException("Lecturer may not have an ID");
        }
        for(Lecturer l: lecturerService.findAll()) {
            if(l.getEmail().equals(lecturer.getEmail())) {
                throw new DuplicateEmailException("E-Mail already in use");
            }
        }
        return ResponseEntity.ok(lecturerService.save(lecturer));
    }

    @Override
    public ResponseEntity<Lecturer> updateLecturer(Lecturer lecturer) throws BadRequestException {
        if(lecturer.getId() == null) {
            throw new BadRequestException("ID must have a value");
        }
        Lecturer target = lecturerService.findOne(lecturer.getId()).get();
        target.setFirstName(lecturer.getFirstName());
        target.setLastName(lecturer.getLastName());
        target.setLectureDates(lecturer.getLectureDates());
        target.setLectures(lecturer.getLectures());
        target.setStudyProgram(lecturer.getStudyProgram());
        target.setEmail(lecturer.getEmail());

        return ResponseEntity.ok(lecturerService.save(target));
    }

    @Override
    public ResponseEntity<Lecturer> updateLecturer(Long id, Lecturer lecturerDetails) throws ResourceNotFoundException {

        Optional<Lecturer> found = lecturerService.findOne(id);
        if(!found.isPresent()) {
             throw new ResourceNotFoundException("Resource not found");
        }
        
        Lecturer target = lecturerService.findOne(id).get();
        target.setEmail(lecturerDetails.getEmail());
        target.setFirstName(lecturerDetails.getFirstName());
        target.setLastName(lecturerDetails.getLastName());
        target.setLectureDates(lecturerDetails.getLectureDates());
        target.setLectures(lecturerDetails.getLectures());
        target.setStudyProgram(lecturerDetails.getStudyProgram());

        return ResponseEntity.ok(lecturerService.save(target));
    }

    @Override
    public ResponseEntity<List<Lecturer>> getAlllecturers() {
        return ResponseEntity.ok(lecturerService.findAll());
    }

    @Override
    public ResponseEntity<Lecturer> getLecturer(Long id) throws ResourceNotFoundException {
        Optional<Lecturer> found = lecturerService.findOne(id);
        if(found == null) {
            throw new ResourceNotFoundException("Resource not found");
        }
        return ResponseEntity.ok(found.get());
    }

    @Override
    public ResponseEntity<Void> deleteLecturer(Long id) {
        lecturerService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
