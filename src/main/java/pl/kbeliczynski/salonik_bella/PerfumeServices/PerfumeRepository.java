package pl.kbeliczynski.salonik_bella.PerfumeServices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume,Long> {
}
