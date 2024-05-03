package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.GardenTools;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGardenToolsRepository extends JpaRepository<GardenTools, Long> {
    List<GardenTools> findByGardenId(Long gardenId);
}
