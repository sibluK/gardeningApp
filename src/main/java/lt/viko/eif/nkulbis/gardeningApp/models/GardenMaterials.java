package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Garden_Materials")
public class GardenMaterials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Garden_Materials_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Material_ID")
    private Material material;

    @ManyToOne
    @JoinColumn(name = "Garden_ID")
    private Garden garden;

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

    public Garden getGarden() {
        return garden;
    }

    public void setGarden(Garden garden) {
        this.garden = garden;
    }
}
