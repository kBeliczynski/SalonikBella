package pl.kbeliczynski.salonik_bella.visitService;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.NumberFormat;
import pl.kbeliczynski.salonik_bella.hairdressingServices.Haircut;
import pl.kbeliczynski.salonik_bella.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Entity
public class Visit implements Serializable {
    private static final long serialVersionUID = 7449936152170847417L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String visitBegin;
    private String visitEnd;
    @OneToOne
    private Haircut haircutType;
    private int userId;
    private String userInfo;
    private String adminInfo;
    @NumberFormat
    private int phone;
    private VisitStatus status;

    public Visit(){}

    public Visit(String visitBegin, String visitEnd, Haircut haircutType, int userId, String userInfo, String adminInfo, int phone, VisitStatus status) {
        this.visitBegin = visitBegin;
        this.visitEnd = visitEnd;
        this.haircutType = haircutType;
        this.userId = userId;
        this.userInfo = userInfo;
        this.adminInfo = adminInfo;
        this.phone = phone;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVisitBegin() {
        return visitBegin;
    }

    public void setVisitBegin(String visitBegin) {
        this.visitBegin = visitBegin;
    }

    public String getVisitEnd() {
        return visitEnd;
    }

    public void setVisitEnd(String visitEnd) {
        this.visitEnd = visitEnd;
    }

    public Haircut getHaircutType() {
        return haircutType;
    }

    public void setHaircutType(Haircut haircutType) {
        this.haircutType = haircutType;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public String getAdminInfo() {
        return adminInfo;
    }

    public void setAdminInfo(String adminInfo) {
        this.adminInfo = adminInfo;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public VisitStatus getStatus() {
        return status;
    }

    public void setStatus(VisitStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Visit{" +
                "id=" + id +
                ", visitBegin=" + visitBegin +
                ", visitEnd=" + visitEnd +
                ", haircutType=" + haircutType +
                ", userId=" + userId +
                ", userInfo='" + userInfo + '\'' +
                ", adminInfo='" + adminInfo + '\'' +
                ", phone=" + phone +
                ", status=" + status +
                '}';
    }
}

