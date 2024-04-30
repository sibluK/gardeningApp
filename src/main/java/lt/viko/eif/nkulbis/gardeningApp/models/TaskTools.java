package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Task_Tools")
public class TaskTools {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Task_Tools_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Tool_ID")
    private Tool tool;

    @ManyToOne
    @JoinColumn(name = "Task_ID")
    private Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tool getTool() {
        return tool;
    }

    public void setTool(Tool tool) {
        this.tool = tool;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
