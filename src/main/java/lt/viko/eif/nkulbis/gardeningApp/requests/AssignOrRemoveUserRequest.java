package lt.viko.eif.nkulbis.gardeningApp.requests;

public class AssignOrRemoveUserRequest {
    private Long gardenId;
    private String username;

    public Long getGardenId() {
        return gardenId;
    }

    public void setGardenId(Long gardenId) {
        this.gardenId = gardenId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
