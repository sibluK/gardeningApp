package lt.viko.eif.nkulbis.gardeningApp.repositories;

import lt.viko.eif.nkulbis.gardeningApp.models.Task;
import lt.viko.eif.nkulbis.gardeningApp.models.TaskMaterials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITaskMaterialsRepository extends JpaRepository<TaskMaterials, Long> {
    void deleteByTask(Task task);
}
