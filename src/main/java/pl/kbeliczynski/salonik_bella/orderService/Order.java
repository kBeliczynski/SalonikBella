package pl.kbeliczynski.salonik_bella.orderService;

import org.springframework.format.annotation.NumberFormat;
import pl.kbeliczynski.salonik_bella.PerfumeServices.Perfume;
import pl.kbeliczynski.salonik_bella.productServices.Product;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Order implements Serializable {
     private static final long serialVersionUID = 8528936152170847419L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String firstName;
     private String lastName;
     @NotEmpty
     @NumberFormat
     private String phoneNumber;
     @NotEmpty
     private String city;
     @NotEmpty
     private String zipCode;
     @NotEmpty
     private String street;
     @NotEmpty
     private Double price;
     private delivery deliveryDetails;
     private shipping shippingDetails;
     private Date orderDate;
     private Date endDate;
     private orderStatus status;
     @ManyToMany
     private List<Perfume> perfumeList = new ArrayList<>();
     @ManyToMany
     private List<Product> productList = new ArrayList<>();

    Order() {}

    public Order(String firstName, String lastName, String phoneNumber, String city, String zipCode, String street, Double price, delivery deliveryDetails, shipping shippingDetails, Date orderDate, Date endDate, orderStatus status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.zipCode = zipCode;
        this.street = street;
        this.price = price;
        this.deliveryDetails = deliveryDetails;
        this.shippingDetails = shippingDetails;
        this.orderDate = orderDate;
        this.endDate = endDate;
        this.status = status;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public delivery getDeliveryDetails() {
        return deliveryDetails;
    }

    public void setDeliveryDetails(delivery deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
    }

    public shipping getShippingDetails() {
        return shippingDetails;
    }

    public void setShippingDetails(shipping shippingDetails) {
        this.shippingDetails = shippingDetails;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public orderStatus getStatus() {
        return status;
    }

    public void setStatus(orderStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", city='" + city + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", street='" + street + '\'' +
                ", price=" + price +
                ", deliveryDetails=" + deliveryDetails +
                ", shippingDetails=" + shippingDetails +
                ", orderDate=" + orderDate +
                ", endDate=" + endDate +
                ", status=" + status +
                '}';
    }
}
