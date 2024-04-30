package lt.viko.eif.nkulbis.gardeningApp.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Garden")
public class Garden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Garden_ID")
    private Long id;

    @Column(name = "Garden_Name")
    private String name;

    @Column(name = "Garden_Description")
    private String description;

    @Column(name = "Garden_Size")
    private String size;

    @Column(name = "Garden_Location_Country")
    private String country;

    @Column(name = "Garden_Location_City")
    private String city;

    @Column(name = "Garden_Location_Street")
    private String street;

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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
