package pl.kbeliczynski.salonik_bella.PerfumeServices;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.List;

@Entity
public class Perfume implements Serializable {
    private static final long serialVersionUID = 8539936152170847418L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String gender;
    private String volume;
    private int price;
    private String description;
    private String smell;
    private String photo;
    private String extraInfo;

    public Perfume(){};

    public Perfume(String name, String gender, String volume, int price, String description, String smell, String photo, String extraInfo) {
        this.name = name;
        this.gender = gender;
        this.volume = volume;
        this.price = price;
        this.description = description;
        this.smell = smell;
        this.photo = photo;
        this.extraInfo = extraInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSmell() {
        return smell;
    }

    public void setSmell(String smell) {
        this.smell = smell;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }

    @Override
    public String toString() {
        return "Perfume{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", volume=" + volume +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", smell='" + smell + '\'' +
                ", photo='" + photo + '\'' +
                ", extraInfo='" + extraInfo + '\'' +
                '}';
    }
}
