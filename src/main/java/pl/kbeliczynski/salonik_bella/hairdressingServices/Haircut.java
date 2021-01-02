package pl.kbeliczynski.salonik_bella.hairdressingServices;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Haircut implements Serializable {
    private static final long serialVersionUID = 8539936152170847419L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private int price;
    private String gender;
    private int maxPrice;
    private int duration;

    public Haircut() {}

    public Haircut(String name, String description, int price, String gender, int maxPrice, int duration) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.gender = gender;
        this.maxPrice = maxPrice;
        this.duration = duration;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(int maxPrice) {
        this.maxPrice = maxPrice;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Haircut{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", gender='" + gender + '\'' +
                ", maxPrice=" + maxPrice +
                ", duration=" + duration +
                '}';
    }
}
