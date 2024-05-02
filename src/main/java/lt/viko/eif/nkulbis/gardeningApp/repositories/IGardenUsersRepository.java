package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.GardenUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGardenUsersRepository extends JpaRepository<GardenUsers, Long> {
    List<GardenUsers> findByUserId(Long userId);
}
