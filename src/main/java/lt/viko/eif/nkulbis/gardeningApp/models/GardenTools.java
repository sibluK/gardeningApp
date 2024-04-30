package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Garden_Tools")
public class GardenTools {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Garden_Tools_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Tool_ID")
    private Tool tool;

    @ManyToOne
    @JoinColumn(name = "Garden_ID")
    private Garden garden;

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

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }
}

