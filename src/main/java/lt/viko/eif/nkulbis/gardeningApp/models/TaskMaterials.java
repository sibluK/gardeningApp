package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Task_Materials")
public class TaskMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Task_Materials_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Material_ID")
    private Material material;

    @ManyToOne
    @JoinColumn(name = "Task_ID")
    private Task task;

    @Column(name = "Material_Quantity_Used")
    private Long name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Long getName() {
        return name;
    }

    public void setName(Long name) {
        this.name = name;
    }
}
