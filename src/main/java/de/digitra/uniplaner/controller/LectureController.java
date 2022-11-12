package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureController;
import de.digitra.uniplaner.service.LectureService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lectures")
public class LectureController implements ILectureController {

    @Override
    public ResponseEntity<Lecture> createLecture(Lecture lecture) throws BadRequestException {
        if(lecture.getId() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Lecture> updateLecture(Lecture lecture) throws BadRequestException {
        if(lecture.getId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
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
    public ResponseEntity<Lecture> updateLecture(Long id, Lecture lectureDetails) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ResponseEntity<List<Lecture>> getAlllectures() {
        return null;
    }

    @Override
    public ResponseEntity<Lecture> getLecture(Long id) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteLecture(Long id) {
        return null;
    }
}
