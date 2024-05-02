package lt.viko.eif.nkulbis.gardeningApp;

import jakarta.annotation.PostConstruct;
import lt.viko.eif.nkulbis.gardeningApp.models.UserType;
import lt.viko.eif.nkulbis.gardeningApp.repositories.IUserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GardeningAppApplication {

	/*
	@Autowired
	private IUserTypeRepository repository;
	 */

	public static void main(String[] args) {
		SpringApplication.run(GardeningAppApplication.class, args);
	}

	/*
	@PostConstruct
	public void init() {
		UserType type1 = new UserType();
		type1.setName("Administrator");
		repository.save(type1);

		UserType type2 = new UserType();
		type2.setName("User");
		repository.save(type2);
	}
	 */
}

