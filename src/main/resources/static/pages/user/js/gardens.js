const gardenCreationWindow = document.querySelector('.garden-creation-container');
const userId = localStorage.getItem('userId');

gardenCreationWindow.querySelector('.create-garden-button').addEventListener('click', function() {
    const formData = {
        name: document.getElementById('name').value,
        size: document.getElementById('size').value,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        street: document.getElementById('street').value,
        description: document.getElementById('description').value,
        userId: localStorage.getItem('userId')
    };
        
    fetch('/garden/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.location.reload();
        return response.json();
    })
    .then(data => {
                console.log('Server response:', data);
    })
    .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    //On page load fetching the gardens of the user
    fetch(`/garden/gardens?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch gardens');
            }
            return response.json();
        })
        .then(gardens => {
            //Creating and appending the newGardenCard to the garden card container
            const cardContainer = document.getElementById('garden-card-container');
            const newGardenCard = createNewGardenCardWithPlusIcon();
            cardContainer.appendChild(newGardenCard)

            //Getting the add garden card button and on click displaying the
            //garden creation window
            const addNewGardenButton = newGardenCard.querySelector('#plus-icon')
            addNewGardenButton.addEventListener('click', function () {
                gardenCreationWindow.style.scale = 1;

            });

            //Looping through the gardens and creating a card for each one
            gardens.forEach(garden => {
                //Creating the card
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('garden-card');

                //Creating the svg
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'garden-icon');
                svg.setAttribute('fill', '#000000');
                svg.setAttribute('viewBox', '0 0 100 100');
                svg.setAttribute('version', '1.1');
                svg.setAttribute('xml:space', 'preserve');
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', 'M96,35c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.1-0.1-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0,0l-22-19 ' +    
                'c0,0-0.1,0-0.1-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0H42c-0.1,0-0.2,0-0.4,0.1c0,0-0.1,0.1-0.1,0.1   c-0.1,0-0.1,0.1-0.2,0.1l-13,11.2c-0.1-0.5-0.2-1.1-0.3-1.7c-0.1-1-0.2-2-0.7-2.9c-0.7-1.2-1.7-2-2.6-2.6c-0.5-0.3-0.9-0.6-1.2-0.9   c-0.3-0.3-0.6-0.6-0.8-0.9c-0.4-0.4-0.7-0.8-1.1-1.2C21.1,15.7,20.2,15,19,15c-1.6,0-2.7,1.2-3.7,2.4c-0.3,0.3-0.5,0.6-0.8,0.9' +  
                'c-0.3,0.3-0.7,0.6-1.2,1c-0.9,0.7-1.9,1.4-2.6,2.6c-0.5,0.9-0.6,1.9-0.7,2.8c-0.1,0.8-0.2,1.5-0.4,2.2c-0.2,0.5-0.6,1.1-1,1.7   c-0.6,0.8-1.2,1.6-1.5,2.7c-0.3,1-0.2,2-0.2,2.9c0,0.8,0.1,1.5,0,2.1c-0.1,0.6-0.5,1.2-0.8,1.9c-0.5,0.9-0.9,1.7-1.1,2.8   c-0.2,1,0,2,0.2,3c0.1,0.7,0.3,1.4,0.2,2.1c-0.1,0.7-0.3,1.3-0.6,2.1C4.3,49,4,49.9,4,50.9c0,0.9,0.4,1.6,0.7,2.2   c0.2,0.4,0.4,0.8,0.4,1.1c0,0.4-0.1,0.8-0.3,1.3c-0.2,0.7-0.5,1.4-0.3,2.2c0.2,0.9,0.7,1.6,1.2,2.1c0.3,0.3,0.5,0.6,0.6,0.9' +
                'C6.4,61,6.4,61.5,6.4,62c0,0.7-0.1,1.6,0.4,2.3c0.5,0.9,1.4,1.3,2.1,1.6c0.4,0.2,0.7,0.3,0.9,0.5c0.2,0.2,0.4,0.6,0.7,1   c0.4,0.7,0.8,1.5,1.7,1.9c0.4,0.2,0.8,0.3,1.2,0.3c0.4,0,0.8-0.1,1.2-0.1c0.1,0,0.2,0,0.2,0L14.4,78H5c-0.6,0-1,0.4-1,1v5   c0,0.6,0.4,1,1,1h90c0.6,0,1-0.4,1-1v-5L96,35C96,35,96,35,96,35z M65,78V61l14,0v17H65z M33,78V58h8v20H33z M43,58h8v20h-8V58z    M52,56H32c-0.6,0-1,0.4-1,1v21H21V42h30h12v36H53V57C53,56.4,52.6,56,52,56z M42,17.3L61.3,34H22.7L42,17.3z M72.6,17l19.7,17' +   
                'H64.4L44.7,17H72.6z M21,40v-4h42v4H51H21z M65,42h14v17l-14,0V42z M81,42h13v17l-13,0V42z M65,40v-4h29v4H65z M81,61l13,0v17H81   V61z M14.2,67.3c-0.5,0.1-1,0.2-1.3,0c-0.3-0.1-0.5-0.6-0.8-1c-0.3-0.5-0.6-1-1-1.4c-0.4-0.4-0.9-0.6-1.4-0.9    c-0.5-0.2-1-0.5-1.2-0.8c-0.1-0.2-0.1-0.7-0.1-1.2c0-0.6,0-1.3-0.2-2c-0.2-0.6-0.6-1.1-1-1.5c-0.4-0.4-0.7-0.8-0.8-1.2    c0-0.3,0.1-0.7,0.3-1.2c0.2-0.6,0.4-1.3,0.4-2.1c0-0.7-0.4-1.3-0.7-1.8C6.2,51.7,6,51.3,6,50.9c0-0.6,0.3-1.4,0.6-2.1    c0.3-0.8,0.6-1.7,0.7-2.6c0.1-0.9-0.1-1.8-0.3-2.6c-0.2-0.8-0.3-1.6-0.2-2.3c0.1-0.7,0.5-1.4,0.9-2.1c0.4-0.8,0.8-1.5,1-2.4' +    
                'c0.2-0.9,0.1-1.8,0.1-2.7c-0.1-0.8-0.1-1.6,0.1-2.2c0.2-0.7,0.7-1.4,1.2-2.1c0.5-0.7,1-1.4,1.3-2.1c0.3-0.9,0.5-1.8,0.6-2.6     c0.1-0.8,0.2-1.6,0.5-2.1c0.4-0.8,1.3-1.4,2-1.9c0.5-0.4,1-0.7,1.5-1.2c0.3-0.3,0.6-0.7,0.9-1c0.8-0.9,1.5-1.7,2.2-1.7    c0.4,0,0.8,0.2,1.3,0.7c0.3,0.3,0.6,0.7,1,1c0.3,0.3,0.6,0.7,0.9,1c0.4,0.4,0.9,0.8,1.4,1.2c0.8,0.6,1.6,1.1,2,1.9    c0.3,0.5,0.4,1.3,0.5,2.1c0.1,0.9,0.2,1.7,0.5,2.6c0,0.1,0.1,0.2,0.1,0.3L19.6,34c-0.2,0-0.4-0.1-0.6-0.1c-1.6,0-2.8,1.2-2.9,2.7    l-1.3,30.6C14.6,67.3,14.4,67.3,14.2,67.3z M18.1,36.7c0-0.4,0.4-0.8,0.9-0.8V78h' +
                '-2.6L18.1,36.7z M6,83v-3h14h12h20h12h30v3H6z');
                svg.appendChild(path);

                //Creating the name of the garden
                const heading = document.createElement('h3');
                heading.textContent = garden.name;

                //Creating the button for managing the garden
                const button = document.createElement('button');
                button.textContent = 'Manage';
                button.setAttribute('class', 'button');

                //Appending the svg, heading and button elements to the garden card
                cardDiv.appendChild(svg);
                cardDiv.appendChild(heading);
                cardDiv.appendChild(button);

                //Inserting the newly created garden card before the addGardenCard
                cardContainer.insertBefore(cardDiv, newGardenCard);

                //The manage button listens for clicks 
                button.addEventListener('click', function() {
                    window.location.assign(`/pages/user/html/gardenManagement.html?gardenId=${garden.id}`);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching gardens:', error);
        });
});

function createNewGardenCardWithPlusIcon() {
    // Create the div element
    const createNewGardenCard = document.createElement('div');
    createNewGardenCard.id = 'create-new-garden-card';

    // Create the SVG element
    const plusIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusIcon.setAttribute('id', 'plus-icon');
    plusIcon.setAttribute('viewBox', '0 0 24 24');
    plusIcon.setAttribute('fill', '');

    // Create the path element inside the SVG
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z');

    // Append the path element to the SVG element
    plusIcon.appendChild(path);

    // Append the SVG element to the div element
    createNewGardenCard.appendChild(plusIcon);

    // Return the created div element
    return createNewGardenCard;
}

///////////////////////////////////I GARDENMANAGEMENT.JS//////////////////////
function fetchAndDisplayGarden(gardenId) {
    fetch(`/garden/manage/${gardenId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch garden');
            }
            return response.json();
        })
        .then(garden => {
            console.log('Garden:', garden);
            fetchAndDisplayToolData(gardenId);

        })
        .catch(error => {
            console.error('Error fetching garden:', error);
        });
}


const addedToolContainer = document.querySelector('.tool-list');
const lastChild = addedToolContainer.lastElementChild;
const toolWindow = document.querySelector('.tool-window');
const toolNameSpan = document.querySelector('.tool-name');
const toolCategorySpan = document.querySelector('.tool-category');
const toolAvailabilitySpan = document.querySelector('.tool-availability');
const toolLastUsedSpan = document.querySelector('.tool-last-used');
const toolDescriptionSpan = document.querySelector('.tool-description');
document.querySelector('.tool-save-button').addEventListener('click', function() {
    toolWindow.style.scale = 0;
})
const addToolWindow = document.querySelector('.tool-add-window');
document.querySelector('.add-tool-cancel-button').addEventListener('click', function () {
    addToolWindow.style.scale = 0;
})

const addToolButton = document.querySelector('.add-tool-add-button');

function fetchAndDisplayToolData(gardenId) {
    fetch(`/tool/${gardenId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch tools');
            }
            return response.json();
        })
        .then(tools => {
            console.log('Tools:', tools);
            tools.forEach(tool => {
                const toolDiv = document.createElement('div');
                toolDiv.classList.add('tool');
                toolDiv.innerText = tool.name;

                addedToolContainer.append(lastChild);

                lastChild.addEventListener('click', function() {
                    addToolWindow.style.scale = 1;
                    
                    const addToolCategorySelect = document.getElementById('add-tool-category');
                    addToolCategorySelect.innerHTML = '';
                        fetch('/category/all')
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to fetch categories');
                                }
                                return response.json();
                            })
                            .then(categories => {
                                const categorySelect = document.getElementById('add-tool-category');
                                categories.forEach(category => {
                                    const option = document.createElement('option');
                                    option.value = category.id;
                                    option.textContent = category.name;
                                    categorySelect.appendChild(option);
                                });
                            })
                            .catch(error => {
                                console.error('Error fetching categories:', error);
                            });

                    addToolButton.addEventListener('click', function() {
                        const formData = {
                            name: document.getElementById('add-tool-name').value,
                            categoryId: document.getElementById('add-tool-category').value,
                            description: document.getElementById('add-tool-description').value,
                            availabilityId: 1,
                            lastUsedDate: new Date().toISOString(),
                            gardenId: gardenId
                        };

                            fetch('/tool/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to add tool');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('Tool added successfully:', data);
                            })
                            .catch(error => {
                                console.error('Error adding tool:', error);
                            })
                    });
                })
                addedToolContainer.insertBefore(toolDiv, lastChild);

                toolDiv.addEventListener('click', function() {
                    toolWindow.style.scale = 1;
                    toolNameSpan.innerText = '';
                    toolAvailabilitySpan.innerHTML = '';
                    toolCategorySpan.innerHTML = '';
                    toolDescriptionSpan.innerHTML = '';
                    toolLastUsedSpan.innerHTML = '';

                    toolNameSpan.innerText = tool.name;
                    toolCategorySpan.innerText = tool.category.name;
                    toolAvailabilitySpan.innerText = tool.availability.name;
                    toolLastUsedSpan.innerText = tool.lastUsedDate;
                    toolDescriptionSpan.innerText = tool.description;
                })
            })
        })
}
