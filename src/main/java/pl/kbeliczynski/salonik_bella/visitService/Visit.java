package pl.kbeliczynski.salonik_bella.visitService;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.NumberFormat;
import pl.kbeliczynski.salonik_bella.hairdressingServices.Haircut;
import pl.kbeliczynski.salonik_bella.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class Visit implements Serializable {
    private static final long serialVersionUID = 7449936152170847417L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    @JsonFormat(pattern="yyyy/MM/dd HH:mm")
    private LocalDateTime VisitBegin;
    @NotEmpty
    @JsonFormat(pattern="yyyy/MM/dd HH:mm")
    private LocalDateTime VisitEnd;
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

    public Visit(@NotEmpty LocalDateTime visitBegin, @NotEmpty LocalDateTime visitEnd, @NotEmpty Haircut haircutType, String userInfo, String adminInfo, @NotEmpty int phone, VisitStatus status) {
        VisitBegin = visitBegin;
        VisitEnd = visitEnd;
        this.haircutType = haircutType;
        this.userInfo = userInfo;
        AdminInfo = adminInfo;
        this.phone = phone;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getVisitBegin() {
        return VisitBegin;
    }

    public void setVisitBegin(LocalDateTime visitBegin) {
        VisitBegin = visitBegin;
    }

    public LocalDateTime getVisitEnd() {
        return VisitEnd;
    }

    public void setVisitEnd(LocalDateTime visitEnd) {
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
