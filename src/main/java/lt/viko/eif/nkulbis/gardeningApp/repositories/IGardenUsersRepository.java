package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Garden;
import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import lt.viko.eif.nkulbis.gardeningApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IGardenUsersRepository extends JpaRepository<GardenUsers, Long> {
    List<GardenUsers> findByUserId(Long userId);
    List<GardenUsers> findByGardenId(Long gardenId);

    Optional<GardenUsers> findByUserAndGarden(User user, Garden garden);
}
