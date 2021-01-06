package pl.kbeliczynski.salonik_bella.visitService;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit,Long> {
    void deleteById(Long id);
    List<Visit> findByVisitBeginContaining(String date);
}
