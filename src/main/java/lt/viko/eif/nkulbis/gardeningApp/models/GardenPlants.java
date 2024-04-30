package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Garden_Plants")
public class GardenPlants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Garden_Plants_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Plant_ID")
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "Garden_ID")
    private Garden garden;

    @Column(name = "Plant_Date")
    private Date datePlanted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Plant getPlant() {
        return plant;
    }

    public void setPlant(Plant plant) {
        this.plant = plant;
    }

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }

    public Date getDatePlanted() {
        return datePlanted;
    }

    public void setDatePlanted(Date datePlanted) {
        this.datePlanted = datePlanted;
    }
}
