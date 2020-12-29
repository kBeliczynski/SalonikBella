package pl.kbeliczynski.salonik_bella.visitService;

import org.springframework.format.annotation.NumberFormat;
import pl.kbeliczynski.salonik_bella.hairdressingServices.Haircut;
import pl.kbeliczynski.salonik_bella.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Visit implements Serializable {
    private static final long serialVersionUID = 7449936152170847417L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private Date VisitBegin;
    @NotEmpty
    private Date VisitEnd;
    @OneToOne
    private User user;
    @NotEmpty
    @OneToOne
    private Haircut haircutType;
    private String userInfo;
    private String AdminInfo;
    @NotEmpty
    @NumberFormat
    private int phone;
    private VisitStatus status;

    public Visit(){}

    public Visit(@NotEmpty Date visitBegin, @NotEmpty Date visitEnd, @NotEmpty Haircut haircutType, String userInfo, String adminInfo, @NotEmpty int phone, VisitStatus status, User user) {
        VisitBegin = visitBegin;
        VisitEnd = visitEnd;
        this.haircutType = haircutType;
        this.userInfo = userInfo;
        AdminInfo = adminInfo;
        this.phone = phone;
        this.status = status;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getVisitBegin() {
        return VisitBegin;
    }

    public void setVisitBegin(Date visitBegin) {
        VisitBegin = visitBegin;
    }

    public Date getVisitEnd() {
        return VisitEnd;
    }

    public void setVisitEnd(Date visitEnd) {
        VisitEnd = visitEnd;
    }

    public Haircut getHaircutType() {
        return haircutType;
    }

    public void setHaircutType(Haircut haircutType) {
        this.haircutType = haircutType;
    }

    public String getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public String getAdminInfo() {
        return AdminInfo;
    }

    public void setAdminInfo(String adminInfo) {
        AdminInfo = adminInfo;
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
                ", VisitBegin=" + VisitBegin +
                ", VisitEnd=" + VisitEnd +
                ", haircutType=" + haircutType +
                ", userInfo='" + userInfo + '\'' +
                ", AdminInfo='" + AdminInfo + '\'' +
                ", phone=" + phone +
                ", status=" + status +
                '}';
    }
}
