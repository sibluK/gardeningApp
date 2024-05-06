package lt.viko.eif.nkulbis.gardeningApp.requests;

public class RemoveToolRequest {
    private Long gardenId;
    private Long toolId;

    public Long getGardenId() {
        return gardenId;
    }

    public void setGardenId(Long gardenId) {
        this.gardenId = gardenId;
    }

    public Long getToolId() {
        return toolId;
    }

    public void setToolId(Long toolId) {
        this.toolId = toolId;
    }
}
