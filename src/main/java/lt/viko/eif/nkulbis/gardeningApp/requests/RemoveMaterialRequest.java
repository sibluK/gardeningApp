package lt.viko.eif.nkulbis.gardeningApp.requests;

public class RemoveMaterialRequest {
    private Long gardenId;
    private Long materialId;

    public Long getGardenId() {
        return gardenId;
    }

    public void setGardenId(Long gardenId) {
        this.gardenId = gardenId;
    }

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }
}
