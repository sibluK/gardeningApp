package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenMaterials;
import lt.viko.eif.nkulbis.gardeningApp.models.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IGardenMaterialsRepository extends JpaRepository<GardenMaterials, Long> {
    Optional<GardenMaterials> getByGardenAndMaterial(Garden garden, Material material);

    List<GardenMaterials> findByGardenId(Long gardenId);
}
