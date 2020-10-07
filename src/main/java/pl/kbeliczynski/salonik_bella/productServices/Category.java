package pl.kbeliczynski.salonik_bella.productServices;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="category")
public class Category implements Serializable {
    private static final long serialVersionUID = 8539936152170847415L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1024)
    private String description;
    private String photo;
    @JsonBackReference // adnotacja która sprawia że JSON nie wyswietla rekurencji podczas wyswietlania produktu i jego kategorii
    @OneToMany(mappedBy = "category",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Product> devices = new HashSet<>();

    Category() {}

    public Category(String name, String description, String photo, Set<Product> devices) {
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.devices = devices;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Set<Product> getDevices() {
        return devices;
    }

    public void setDevices(Set<Product> devices) {
        this.devices = devices;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", photo='" + photo + '\'' +
                '}';
    }
}
