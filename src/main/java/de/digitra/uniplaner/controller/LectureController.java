package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureController;
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
        return new ResponseEntity<>(lectureService.save(lecture), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() == null){
            throw new BadRequestException("Lecture ID must not be null");
        }

        lectureService.findOne(lecture.getId()).get().setLectureName(lecture.getLectureName());
        lectureService.findOne(lecture.getId()).get().setStudyProgram(lecture.getStudyProgram());
        lectureService.findOne(lecture.getId()).get().setStudyProgramm(lecture.getStudyProgramm());
        lectureService.findOne(lecture.getId()).get().setModulName(lecture.getModulName());
        lectureService.findOne(lecture.getId()).get().setDuration(lecture.getDuration());
        lectureService.findOne(lecture.getId()).get().setLectureDates(lecture.getLectureDates());
        lectureService.findOne(lecture.getId()).get().setLecturers(lecture.getLecturers());

        //Lecture target = lectureService.findOne(lecture.getId()).get();
        return new ResponseEntity<>(lectureService.save(lectureService.findOne(lecture.getId()).get()), HttpStatus.OK);
    }


    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(Long id, de.digitra.uniplaner.domain.Lecture lectureDetails) throws ResourceNotFoundException {
        Optional<Lecture> found = lectureService.findOne(id);
        if(!found.isPresent()) {
            throw new ResourceNotFoundException("Resource not found");
        }

        lectureService.findOne(id).get().setLectureName(lectureDetails.getLectureName());
        lectureService.findOne(id).get().setStudyProgram(lectureDetails.getStudyProgram());
        lectureService.findOne(id).get().setStudyProgramm(lectureDetails.getStudyProgramm());
        lectureService.findOne(id).get().setModulName(lectureDetails.getModulName());
        lectureService.findOne(id).get().setDuration(lectureDetails.getDuration());
        lectureService.findOne(id).get().setLectureDates(lectureDetails.getLectureDates());
        lectureService.findOne(id).get().setLecturers(lectureDetails.getLecturers());

        return new ResponseEntity<>(lectureService.save(lectureService.findOne(id).get()), HttpStatus.OK);
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
