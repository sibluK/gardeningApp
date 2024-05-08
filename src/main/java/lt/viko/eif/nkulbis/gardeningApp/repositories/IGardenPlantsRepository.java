package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenPlants;
import lt.viko.eif.nkulbis.gardeningApp.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IGardenPlantsRepository extends JpaRepository<GardenPlants, Long> {
    List<GardenPlants> findAllByGardenId(Long gardenId);

    Optional<GardenPlants> getByGardenAndPlant(Garden garden, Plant plant);
}
