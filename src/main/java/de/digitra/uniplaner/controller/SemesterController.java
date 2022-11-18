package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Semester;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ISemesterController;
import de.digitra.uniplaner.service.SemesterService;
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
@RequestMapping("/semesters")
public class SemesterController implements ISemesterController {

    @Autowired
    SemesterService semesterService;

    @Override
    public ResponseEntity<Semester> createSemester(Semester semester) throws BadRequestException {
        if(semester.getId() != null) {
            throw new BadRequestException("Semester already has an ID");
        }
        return ResponseEntity.ok(semesterService.save(semester));
    }

    @Override
    public ResponseEntity<Semester> updateSemester(Semester semester) throws BadRequestException {
        if(semester.getId() == null) {
            throw new BadRequestException("Semester ID is null");
        }

        Semester newSemester = semesterService.findOne(semester.getId()).get();
        newSemester.setEndDate(semester.getEndDate());
        newSemester.setName(semester.getName());
        newSemester.setNumber(semester.getNumber());
        newSemester.setStartDate(semester.getStartDate());
        newSemester.setStudyClass(semester.getStudyClass());
        return ResponseEntity.ok(semesterService.save(newSemester));
    }

    @Override
    public ResponseEntity<Semester> updateSemester(Long id, Semester semesterDetails) throws ResourceNotFoundException {
        Optional<Semester> found = semesterService.findOne(id);
        if(!found.isPresent()) {
            throw new ResourceNotFoundException("Resource not found");
        }
        Semester newSemester = found.get();
        newSemester.setEndDate(semesterDetails.getEndDate());
        newSemester.setName(semesterDetails.getName());
        newSemester.setNumber(semesterDetails.getNumber());
        newSemester.setStartDate(semesterDetails.getStartDate());
        newSemester.setStudyClass(semesterDetails.getStudyClass());

        return ResponseEntity.ok(semesterService.save(newSemester));
        

    }

    @Override
    public ResponseEntity<List<Semester>> getAllsemesters() {
        return ResponseEntity.ok(semesterService.findAll());
    }

    @Override
    public ResponseEntity<Semester> getSemester(Long id) throws ResourceNotFoundException {
        Optional<Semester> found = semesterService.findOne(id);
        if(found == null) {
            throw new ResourceNotFoundException("Resource not found");
        }
        return ResponseEntity.ok(found.get());
    }

    @Override
    public ResponseEntity<Void> deleteSemester(Long id) {
        semesterService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
