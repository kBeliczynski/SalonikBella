package pl.kbeliczynski.salonik_bella.galleryServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PictureEndpoint {
    private PictureRepository pictureRepository;

    @Autowired
    public PictureEndpoint(PictureRepository pictureRepository){
        this.pictureRepository = pictureRepository;
    }

    @GetMapping("/api/pictures")
    public List<Picture> getAll(){
        return pictureRepository.findAll();
    }
}
