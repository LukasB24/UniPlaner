package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.LectureDate;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureDateController;
import de.digitra.uniplaner.service.LectureDateService;
import de.digitra.uniplaner.service.LectureService;

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
@RequestMapping("/lecturedates")
public class LectureDateController implements ILectureDateController {

    @Autowired
    LectureDateService lectureDateService;

    @Override
    public ResponseEntity<LectureDate> createLectureDate(LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() != null) {
            throw new BadRequestException("Lecturedate ID is not null");
        }
        return ResponseEntity.ok(lectureDateService.save(lecturedate));
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() == null) {
            throw new BadRequestException("Lecturedate ID is null");
        }
        LectureDate newLectureDate = lectureDateService.findOne(lecturedate.getId()).get();
        newLectureDate.setEndDate(lecturedate.getEndDate());
        newLectureDate.setLecture(lecturedate.getLecture());
        newLectureDate.setLecturer(lecturedate.getLecturer());
        newLectureDate.setSemester(lecturedate.getSemester());
        newLectureDate.setStartDate(lecturedate.getStartDate());

        return ResponseEntity.ok(lectureDateService.save(newLectureDate));
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(Long id, LectureDate lecturedateDetails) throws ResourceNotFoundException {
        Optional<LectureDate> found = lectureDateService.findOne(id);
        if(!found.isPresent()) {
            throw new ResourceNotFoundException("No Lecturedate with ID " + id);
        }
        LectureDate target = found.get();
        target.setEndDate(lecturedateDetails.getEndDate());
        target.setLecture(lecturedateDetails.getLecture());
        target.setLecturer(lecturedateDetails.getLecturer());
        target.setSemester(lecturedateDetails.getSemester());
        target.setStartDate(lecturedateDetails.getStartDate());

        return ResponseEntity.ok(lectureDateService.save(target));
    }

    @Override
    public ResponseEntity<List<LectureDate>> getAlllecturedates() {
        return ResponseEntity.ok(lectureDateService.findAll());
    }

    @Override
    public ResponseEntity<LectureDate> getLectureDate(Long id) throws ResourceNotFoundException {
        Optional<LectureDate> found = lectureDateService.findOne(id);
        if(found == null){
            throw new ResourceNotFoundException("No lecturedate with ID " + id);
        }
        return ResponseEntity.ok(found.get());
    }

    @Override
    public ResponseEntity<Void> deleteLectureDate(Long id) {
        lectureDateService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}



