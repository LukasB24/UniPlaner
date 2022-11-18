package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.domain.Lecturer;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.exceptions.interfaces.ILectureController;
import de.digitra.uniplaner.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lectures")
public class LectureController implements ILectureController {

    @Autowired
    private LectureService lectureService;


    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> createLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() != null) {
            throw new BadRequestException("Lecture ID must be null");
        }
        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }



    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() == null){
            throw new BadRequestException("Lecture ID must not be null");
        }
        //Lecture target = lectureService.findOne(lecture.getId()).get();
        return new ResponseEntity<>(lectureService.save(lecture), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(Long id, de.digitra.uniplaner.domain.Lecture lectureDetails) throws ResourceNotFoundException {
        Optional<Lecture> found = lectureService.findOne(id);
        if(!found.isPresent()) {
            throw new ResourceNotFoundException("Resource not found");
        }
        Lecture target = lectureService.findOne(id).get();
        return new ResponseEntity<>(lectureService.save(target), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<List<de.digitra.uniplaner.domain.Lecture>> getAlllectures() {
        return new ResponseEntity<>(lectureService.findAll(), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> getLecture(Long id) throws ResourceNotFoundException {
        Optional<Lecture> found = lectureService.findOne(id);
        if (found == null){
            throw new ResourceNotFoundException("Resource not found");
        }
        return new ResponseEntity<>(found.get(), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Void> deleteLecture(Long id) {
        lectureService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
