package pl.kbeliczynski.salonik_bella.PerfumeServices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume,Long> {
    List<Perfume> findByNameContainingIgnoreCase(String name);
    List<Perfume> findByGenderContaining(String gender);
}
