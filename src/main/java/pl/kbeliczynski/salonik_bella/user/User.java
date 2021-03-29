package pl.kbeliczynski.salonik_bella.user;

import pl.kbeliczynski.salonik_bella.PerfumeServices.Perfume;
import pl.kbeliczynski.salonik_bella.orderService.Orders;
import pl.kbeliczynski.salonik_bella.productServices.Product;
import pl.kbeliczynski.salonik_bella.visitService.Visit;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User implements Serializable {
    private static final long serialVersionUID = 8549936152170847417L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Email
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;
    @OneToOne
    private UserRole role;
    @ManyToMany
    private List<Perfume> perfumeList = new ArrayList<>();
    @ManyToMany
    private List<Product> productList = new ArrayList<>();
    @OneToMany
    private List<Visit> visitList = new ArrayList<>();
    @OneToMany
    private List<Orders> orderList = new ArrayList<>();

    User() {}

    public User(String firstName, String lastName, @Email @NotEmpty String email, @NotEmpty String password, UserRole role, List<Perfume> perfumeList, List<Product> productList, List<Visit> visitList, List<Orders> orderList) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.perfumeList = perfumeList;
        this.productList = productList;
        this.visitList = visitList;
        this.orderList = orderList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Orders> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<Orders> orderList) {
        this.orderList = orderList;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public List<Perfume> getPerfumeList() {
        return perfumeList;
    }

    public void setPerfumeList(List<Perfume> perfumeList) {
        this.perfumeList = perfumeList;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public List<Visit> getVisitList() {
        return visitList;
    }

    public void setVisitList(List<Visit> visitList) {
        this.visitList = visitList;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", perfumeList=" + perfumeList +
                ", productList=" + productList +
                ", visitList=" + visitList +
                '}';
    }
}
