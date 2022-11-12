package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.exceptions.interfaces.ILectureController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lectures")
public class LectureController implements ILectureController {




    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> createLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }



    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() == null){
            return new ResponseEntity<>((HttpStatus.BAD_REQUEST));
        }
        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }

    /**
     * {@code PUT  /lectures/:id} : aktualisiert eine existierende Ressource vom Typ Lecture.
     *
     * @param id             Id der Ressource vom Typ Lecture, die am Server aktualisiert werden soll.
     * @param lectureDetails Instanz von Lecture, die am Server aktualisiert werden soll.
     *                       Diese Instanz enthält die aktuellen Werte.
     * @return Eine {@link ResponseEntity} mit Status Code {@code 200 (OK)} and im Body die aktualisierte Ressource.
     * @throws ResourceNotFoundException wird ausgelöst, falls die Ressource mit der angegebenen Id nicht gefunden werden konnte.
     */

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(Long id, de.digitra.uniplaner.domain.Lecture lectureDetails) throws ResourceNotFoundException {
        if(lectureDetails.getId().)
        return null;
    }

    @Override
    public ResponseEntity<List<de.digitra.uniplaner.domain.Lecture>> getAlllectures() {
        return null;
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> getLecture(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteLecture(Long id) {
        return null;
    }
}
