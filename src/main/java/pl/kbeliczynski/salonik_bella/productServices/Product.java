package pl.kbeliczynski.salonik_bella.productServices;


import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Product implements Serializable {
    private static final long serialVersionUID = 8539936152170847416L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String extraInfo;
    private String gender;
    private String volume;
    private int price;
    private String photo;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    Product() {};

    public Product(String name, String description, String extraInfo, String gender, String volume, int price, String photo, Category category) {
        this.name = name;
        this.description = description;
        this.extraInfo = extraInfo;
        this.gender = gender;
        this.volume = volume;
        this.price = price;
        this.photo = photo;
        this.category = category;
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

    public String getExtraInfo() {
        return extraInfo;
    }

    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", extraInfo='" + extraInfo + '\'' +
                ", gender='" + gender + '\'' +
                ", volume='" + volume + '\'' +
                ", price=" + price +
                ", photo='" + photo + '\'' +
                ", category=" + category +
                '}';
    }
}
