package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Task;
import lt.viko.eif.nkulbis.gardeningApp.models.TaskUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITaskUsersRepository extends JpaRepository<TaskUsers, Long> {
    void deleteByTask(Task task);
}
