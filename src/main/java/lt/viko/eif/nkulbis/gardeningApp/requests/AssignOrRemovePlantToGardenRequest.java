package lt.viko.eif.nkulbis.gardeningApp.requests;

public class AssignOrRemovePlantToGardenRequest {
    private Long gardenId;
    private Long plantId;

    public Long getGardenId() {
        return gardenId;
    }

    public void setGardenId(Long gardenId) {
        this.gardenId = gardenId;
    }

    public Long getPlantId() {
        return plantId;
    }

    public void setPlantId(Long plantId) {
        this.plantId = plantId;
    }
}
