package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Plant_Habitats")
public class PlantHabitats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Plant_Habitats_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Plant_ID")
    private Plant plant;

    @ManyToOne
    @JoinColumn(name = "Habitat_ID")
    private Habitat habitat;

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

    public Habitat getHabitat() {
        return habitat;
    }

    public void setHabitat(Habitat habitat) {
        this.habitat = habitat;
    }
}
