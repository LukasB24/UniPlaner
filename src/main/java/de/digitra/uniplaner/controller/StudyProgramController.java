package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.domain.StudyProgram;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.exceptions.interfaces.IStudyProgramController;
import de.digitra.uniplaner.service.StudyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/studyprograms")
public class StudyProgramController implements IStudyProgramController {

    @Autowired
    private StudyProgramService studyProgramService;


    @Override
    public ResponseEntity<StudyProgram> createStudyProgram(StudyProgram studyprogram) throws BadRequestException {
        if (studyprogram.getId() != null){
            throw new BadRequestException("StudyProgram ID must be null");
        }
        return new ResponseEntity<>(studyprogram, HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(StudyProgram studyprogram) throws BadRequestException {
        if (studyprogram.getId() == null){
            throw new BadRequestException("StudyProgram ID must not be null");
        }
        return new ResponseEntity<>(studyProgramService.save(studyprogram),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(Long id, StudyProgram studyprogramDetails) throws ResourceNotFoundException {
        //Optional<StudyProgram> found = studyProgramService.findOne(id);
        if(!studyProgramService.findOne(id).isPresent()) {
            throw new ResourceNotFoundException("StudyProgram not found");
        }
        //StudyProgram target = studyProgramService.findOne(id).get();
        return new ResponseEntity<>(studyProgramService.findOne(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<StudyProgram>> getAllstudyprograms() {
        return new ResponseEntity<>(studyProgramService.findAll(), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyProgram> getStudyProgram(Long id) throws ResourceNotFoundException {
        if (studyProgramService.findOne(id) == null) {
            throw new ResourceNotFoundException("StudyProgram not found");
        }
        return new ResponseEntity<>(studyProgramService.findOne(id).get(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteStudyProgram(Long id) {
        studyProgramService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
