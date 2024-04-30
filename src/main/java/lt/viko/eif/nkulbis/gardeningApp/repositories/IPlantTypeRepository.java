package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.PlantType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlantTypeRepository extends JpaRepository<PlantType, Long> {
}
