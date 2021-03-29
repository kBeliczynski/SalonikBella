package pl.kbeliczynski.salonik_bella.orderService;

import org.springframework.format.annotation.NumberFormat;
import pl.kbeliczynski.salonik_bella.PerfumeServices.Perfume;
import pl.kbeliczynski.salonik_bella.productServices.Product;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Orders implements Serializable {
     private static final long serialVersionUID = 8528936152170847419L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     @NotEmpty
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
     private String orderDate;
     private String endDate;
     private orderStatus status;
     private String orderProducts;

    Orders() {}

    public Orders(@NotEmpty String phoneNumber, @NotEmpty String city, @NotEmpty String zipCode, @NotEmpty String street, @NotEmpty Double price, delivery deliveryDetails, shipping shippingDetails, String orderDate, String endDate, orderStatus status, String orderProducts) {
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
        this.orderProducts = orderProducts;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
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
