package lt.viko.eif.nkulbis.gardeningApp.models;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Task_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Status_ID")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "Garden_ID")
    private Garden garden;

    @Column(name = "Task_Name")
    private String name;

    @Column(name = "Task_Type")
    private String type;

    @Column(name = "Task_Description")
    private String description;

    @Column(name = "Task_Due_Date")
    private Date dueDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}
