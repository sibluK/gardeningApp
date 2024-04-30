package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlantRepository extends JpaRepository<Plant, Long> {
}
