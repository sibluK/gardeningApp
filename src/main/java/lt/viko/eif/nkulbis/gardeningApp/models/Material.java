package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Material_ID")
    private Long id;

    @Column(name = "Material_Name")
    private String name;

    @Column(name = "Material_Description")
    private String description;

    @Column(name = "Material_Type")
    private String type;

    @Column(name = "Material_Quantity")
    private Long quantity;

    @Column(name = "Material_Unit")
    private String unit;

    @Column(name = "Expiration_Date")
    private Date expirationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
}
