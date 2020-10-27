package pl.kbeliczynski.salonik_bella.productServices;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="product")
public class Product implements Serializable {
    private static final long serialVersionUID = 8539936152170847416L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long id;
    private String name;
    private String producer;
    @Column(length = 1024)
    private String description;
    @Column(length = 1024)
    private String extraInfo;
    private String gender;
    private String volume;
    private double price;
    private String photo;
    @JsonBackReference// adnotacja która sprawia że JSON nie wyswietla rekurencji podczas wyswietlania produktu i jego kategorii
    @ManyToMany(mappedBy = "products", cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Category> categories = new HashSet<>();


    Product() {
    }

    public Product(String name, String producer, String description, String extraInfo, String gender, String volume, double price, String photo, Set<Category>iescategories) {
        this.name = name;
        this.producer = producer;
        this.description = description;
        this.extraInfo = extraInfo;
        this.gender = gender;
        this.volume = volume;
        this.price = price;
        this.photo = photo;
        this.categories = categories;
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

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Set<Category> getCategory() {
        return categories;
    }

    public void setCategory(Set<Category> categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", producer='" + producer + '\'' +
                ", description='" + description + '\'' +
                ", extraInfo='" + extraInfo + '\'' +
                ", gender='" + gender + '\'' +
                ", volume='" + volume + '\'' +
                ", price=" + price +
                ", photo='" + photo + '\'' +
                '}';
    }
}
