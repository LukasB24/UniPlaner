package de.digitra.uniplaner.controller;


import de.digitra.uniplaner.domain.StudyClass;
import de.digitra.uniplaner.domain.StudyProgram;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.exceptions.interfaces.IStudyClassController;
import de.digitra.uniplaner.service.StudyClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/studyclasss")
public class StudyClassController implements IStudyClassController {

    @Autowired
    private StudyClassService studyClassService;

    @Override
    public ResponseEntity<StudyClass> createStudyClass(StudyClass studyclass) throws BadRequestException {
        if (studyclass.getId() != null){
            throw new BadRequestException("StudyClass ID must be null");
        }
        return new ResponseEntity<>(studyclass, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StudyClass> updateStudyClass(StudyClass studyclass) throws BadRequestException {
        if (studyclass.getId() == null){
            throw new BadRequestException("StudyClass ID must not be null");
        }
        return new ResponseEntity<>(studyClassService.save(studyclass),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<StudyClass> updateStudyClass(Long id, StudyClass studyclassDetails) throws ResourceNotFoundException {
        //Optional<StudyClass> found = studyClassService.findOne(id);
        if(!studyClassService.findOne(id).isPresent()) {
            throw new ResourceNotFoundException("StudyClass not found");
        }
        //StudyProgram target = studyProgramService.findOne(id).get();
        return new ResponseEntity<>(studyClassService.findOne(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<StudyClass>> getAllstudyclasss() {
        return new ResponseEntity<>(studyClassService.findAll(), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyClass> getStudyClass(Long id) throws ResourceNotFoundException {
        if (studyClassService.findOne(id) == null) {
            throw new ResourceNotFoundException("StudyClass not found");
        }
        return new ResponseEntity<>(studyClassService.findOne(id).get(),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<Void> deleteStudyClass(Long id) {
        studyClassService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
