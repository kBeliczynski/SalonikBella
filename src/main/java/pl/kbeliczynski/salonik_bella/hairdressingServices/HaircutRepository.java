package pl.kbeliczynski.salonik_bella.hairdressingServices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HaircutRepository extends JpaRepository<Haircut,Long> {
}
