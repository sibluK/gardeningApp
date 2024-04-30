package lt.viko.eif.nkulbis.gardeningApp.models;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Tool")
public class Tool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Tool_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Category_ID")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "Availability_ID")
    private Availability availability;

    @Column(name = "Tool_Name")
    private String name;

    @Column(name = "Tool_Description")
    private String description;

    @Column(name = "Last_Used_Date")
    private Date lastUsedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
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

    public Date getLastUsedDate() {
        return lastUsedDate;
    }

    public void setLastUsedDate(Date lastUsedDate) {
        this.lastUsedDate = lastUsedDate;
    }
}

