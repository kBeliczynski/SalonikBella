package pl.kbeliczynski.salonik_bella.visitService;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisitRepository extends JpaRepository<Visit,Long> {
}
