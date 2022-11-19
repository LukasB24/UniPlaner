package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.StudyProgram;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.IStudyProgramController;
import de.digitra.uniplaner.service.StudyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        return new ResponseEntity<>(studyProgramService.save(studyprogram), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(StudyProgram studyprogram) throws BadRequestException {
        if (studyprogram.getId() == null){
            throw new BadRequestException("StudyProgram ID must not be null");
        }
        studyProgramService.findOne(studyprogram.getId()).get().setStudyClasses(studyprogram.getStudyClasses());
        studyProgramService.findOne(studyprogram.getId()).get().setName(studyprogram.getName());
        studyProgramService.findOne(studyprogram.getId()).get().setShortName(studyprogram.getShortName());
        studyProgramService.findOne(studyprogram.getId()).get().setLectures(studyprogram.getLectures());
        return new ResponseEntity<>(studyProgramService.save(studyProgramService.findOne(studyprogram.getId()).get()),HttpStatus.OK);
    }


    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(Long id, StudyProgram studyprogramDetails) throws ResourceNotFoundException {
        //Optional<StudyProgram> found = studyProgramService.findOne(id);
        if(!studyProgramService.findOne(id).isPresent()) {
            throw new ResourceNotFoundException("StudyProgram not found");
        }
        studyProgramService.findOne(id).get().setStudyClasses(studyprogramDetails.getStudyClasses());
        studyProgramService.findOne(id).get().setName(studyprogramDetails.getName());
        studyProgramService.findOne(id).get().setShortName(studyprogramDetails.getShortName());
        studyProgramService.findOne(id).get().setLectures(studyprogramDetails.getLectures());


        //StudyProgram target = studyProgramService.findOne(id).get();
        return new ResponseEntity<>(studyProgramService.save(studyProgramService.findOne(id).get()), HttpStatus.OK);
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
