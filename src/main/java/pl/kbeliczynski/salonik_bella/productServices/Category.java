package pl.kbeliczynski.salonik_bella.productServices;

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
    private String description;
    @OneToMany(mappedBy = "category")
    private Set<Product> devices = new HashSet<>();

    Category() {}

    public Category(String name, String description, Set<Product> devices) {
        this.name = name;
        this.description = description;
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
                ", devices=" + devices +
                '}';
    }
}
