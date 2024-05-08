const userId = localStorage.getItem('userId');

document.addEventListener('DOMContentLoaded', function () {
    DisplayPlants();
});

const addPlantToGardenWindow = document.getElementById('add-plant-to-garden-window');

document.getElementById('cancel-plant-to-garden-button').addEventListener('click', function () {
    addPlantToGardenWindow.style.scale = 0;
})

document.getElementById('add-plant-to-garden-button').addEventListener('click', function() {
    const data = {
        gardenId: localStorage.getItem('selectedGarden'),
        plantId: localStorage.getItem('selectedPlant')
    }
    
    fetch(`/plant/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Failed to assign plant')
        }
        addPlantToGardenWindow.style.scale = 0;
        return response.json();
    })
    .catch(error => {
        console.error('Error assigning plant: ', error);
    });
});

function DisplayPlants() {
    const plantCardWrapper = document.getElementById('plant-card-wrapper');
    plantCardWrapper.innerHTML = '';

    fetch(`/plant/all`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch plants');
            }
            return response.json();
        })
        .then(plants => {
            console.log(plants);

            plants.forEach(plant => {
                const plantCardDiv = document.createElement('div');
                plantCardDiv.classList.add('plant-card');

                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("fill", "#000000");
                svg.setAttribute("class", "plant-icon");
                svg.setAttribute("version", "1.1");
                svg.setAttribute("id", "Layer_1");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
                svg.setAttribute("viewBox", "0 0 512 512");
                svg.setAttribute("xml:space", "preserve");

                const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
                const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M465.277,485.664c-14.937-30.378-38.021-55.89-66.757-73.782c-27.237-16.96-58.382-26.324-90.383-27.257V236.699c4.785,0.654,9.673,0.988,14.636,0.988c27.644,0,57.511-10.035,83.936-28.808c35.292-25.073,57.883-61.063,60.43-96.273c0.644-8.897-5.113-17.001-13.727-19.322c-34.086-9.185-75.507,0.298-110.8,25.371c-13.485,9.58-25.108,20.757-34.474,32.873V19.177c0-10.283-8.337-18.62-18.621-18.62s-18.621,8.337-18.621,18.62v32.052c-12.338-14.404-28.601-26.898-47.595-36.108c-36.456-17.676-76.194-19.998-106.3-6.212c-8.11,3.714-12.447,12.658-10.341,21.327c7.819,32.175,34.252,61.938,70.708,79.615c20.697,10.035,42.449,15.121,62.899,15.121c10.677,0,20.999-1.388,30.628-4.181v124.113c-14.298-20.759-33.225-39.944-55.853-56.018c-50.076-35.575-108.563-49.104-156.456-36.2c-8.613,2.321-14.37,10.425-13.727,19.322c3.578,49.472,35.61,100.245,85.684,135.819c37.596,26.708,79.927,40.991,118.963,40.991c7.262,0,14.405-0.514,21.388-1.514v37.354c-31.531,1.151-62.186,10.501-89.045,27.223c-28.735,17.892-51.82,43.404-66.756,73.782c-2.838,5.771-2.496,12.348,0.904,17.807c3.4,5.46,9.375,8.528,15.806,8.528h316.761c6.432,0,12.407-3.069,15.806-8.528C467.772,498.012,468.115,491.436,465.277,485.664z M364.18,149.015c19.817-14.078,42.285-21.825,62.096-21.916c-6.61,18.676-21.318,37.343-41.135,51.421c-19.817,14.078-42.285,21.823-62.097,21.916C329.653,181.759,344.361,163.092,364.18,149.015z M193.617,76.342c-19.296-9.356-34.942-23.252-43.891-38.396c17.429-2.351,38.031,1.328,57.328,10.684c19.296,9.356,34.942,23.252,43.891,38.394C233.516,89.377,212.913,85.698,193.617,76.342z M152.114,277.47c-34.727-24.67-59.427-58.651-67.494-91.752c33.911-3.276,74.132,8.861,108.856,33.529c34.727,24.67,59.427,58.651,67.494,91.752C227.059,314.277,186.836,302.137,152.114,277.47z M165.549,474.759c26.892-33.517,67.561-53.379,111.969-53.379h25.334c44.407,0,85.077,19.862,111.969,53.379H165.549z");

                // Append <path> to <g>
                g2.appendChild(path);

                // Append <g> elements to the main SVG
                g1.appendChild(g2);
                svg.appendChild(g1);
                plantCardDiv.appendChild(svg)

                //Creating and appending the plant name
                const plantName = document.createElement('h3');
                plantName.textContent = plant.name;
                plantCardDiv.appendChild(plantName);

                //Creating and appending 'EXPAND' button
                const expandButton = document.createElement('div');
                expandButton.classList.add('expand-plant-button');
                expandButton.textContent = 'Expand';
                plantCardDiv.appendChild(expandButton);

                //Creating expanded text part
                const expandedText = document.createElement('div');
                expandedText.classList.add('expanded-text');

                //Creating and appending the plant description to the expanded text
                const plantDescriptionH5 = document.createElement('h5');
                plantDescriptionH5.textContent = 'Description: ';
                const plantDescription = document.createElement('span');
                plantDescription.textContent = plant.description;
                plantDescriptionH5.appendChild(plantDescription);
                expandedText.appendChild(plantDescriptionH5);;

                //Creating and appending the plant care instruction to the expanded text
                const plantCareInstructionsH5 = document.createElement('h5');
                plantCareInstructionsH5.textContent = 'Care Instructions: ';
                const plantCareInstructions = document.createElement('span');
                plantCareInstructions.textContent = plant.instructions;
                plantCareInstructionsH5.appendChild(plantCareInstructions);
                expandedText.appendChild(plantCareInstructionsH5);

                //Creating and appending the plant type to the expanded text
                const plantTypeH5 = document.createElement('h5');
                plantTypeH5.textContent = 'Type: ';
                const plantType = document.createElement('span');
                plantType.textContent = plant.type.type;
                plantTypeH5.appendChild(plantType);
                expandedText.appendChild(plantTypeH5);

                //Creating and appending the plant species to the expanded text
                const plantSpeciesH5 = document.createElement('h5');
                plantSpeciesH5.textContent = 'Species: ';
                const plantSpecies = document.createElement('span');
                plantSpecies.textContent = plant.species.name;
                plantSpeciesH5.appendChild(plantSpecies);
                expandedText.appendChild(plantSpeciesH5);

                //Appending the full expanded text to the plant card
                plantCardDiv.appendChild(expandedText);

                //Creating and appending the add plant to garden button
                const addPlantToGardenButton = document.createElement('div');
                addPlantToGardenButton.classList.add('add-plant-to-garden-button');
                addPlantToGardenButton.textContent = 'Add';
                plantCardDiv.appendChild(addPlantToGardenButton);

                //Appending the full card to the wrapper
                plantCardWrapper.appendChild(plantCardDiv);

                let isExpanded = false;
                expandButton.addEventListener('click', function () {
                    if (isExpanded) {
                        plantCardDiv.style.height = '300px';
                        expandedText.style.display = 'none';
                        addPlantToGardenButton.style.display = 'none';
                        expandButton.innerText = 'Expand';
                    } else {
                        plantCardDiv.style.height = '700px';
                        expandedText.style.display = 'block';
                        addPlantToGardenButton.style.display = 'block';
                        expandButton.innerText = 'Contract';
                    }
                    isExpanded = !isExpanded;
                });

                addPlantToGardenButton.addEventListener('click', function() {
                    const gardenDropbox = document.getElementById('garden-dropbox');
                    addPlantToGardenWindow.style.scale = 1;
                    gardenDropbox.innerHTML = '';
                    let gardenCards = [];
                    localStorage.setItem('selectedPlant', plant.id)

                    fetch(`/garden/gardens?userId=${userId}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch gardens');
                            }
                            return response.json();
                        })
                        .then(gardens => {
                            gardens.forEach(garden => {
                                //Creating a card for each garden
                                const gardenCard = document.createElement('div');
                                gardenCard.classList.add('garden-dropbox-item');
                                const gardenName = document.createElement('h5');
                                gardenName.textContent = garden.name;
                                gardenCard.appendChild(gardenName);

                                //Appending the new garden card to the garden box
                                gardenDropbox.appendChild(gardenCard);
                                
                                gardenCards.push(gardenCard);

                                gardenCard.addEventListener('click', function() {
                                    //Remove 'selected-item' class from all garden cards
                                    gardenCards.forEach(function(card) {
                                        card.classList.remove('selected-item');
                                    });
                                    //Add 'selected-item' class to the clicked garden card
                                    gardenCard.classList.add('selected-item');
                                    localStorage.setItem('selectedGarden', garden.id)
                                });

                            });

                        })
                        .catch(error => {
                            console.error('Error fetching gardens:', error);
                        });
                });
            })
        })
        .catch(error => {
            console.error('Error fetching plants:', error);
        });
}

