package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.GardenPlants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGardenPlantsRepository extends JpaRepository<GardenPlants, Long> {
    List<GardenPlants> findAllByGardenId(Long gardenId);
}
