const gardenInfoWrapper = document.getElementById('garden-information-wrapper');
const urlParams = new URLSearchParams(window.location.search);
const gardenId = urlParams.get('gardenId');

document.addEventListener('DOMContentLoaded', function() {

    DisplayGardenData();
    DisplayTools();
    DisplayCategories();
});

document.getElementById('add-tool-button').addEventListener('click', function () {
    const formData = {
        name: document.getElementById('tool-name-input').value,
        categoryId: document.getElementById('tool-category-selection').value,
        description: document.getElementById('description-text-area').value,
        availabilityId: 1,
        lastUsedDate: new Date().toISOString(),
        gardenId: gardenId
    };

    const jsonData = JSON.stringify(formData)
    console.log(jsonData);

    fetchAddTool('/tool/add', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        document.getElementById('tool-name-input').value = '';
        document.getElementById('description-text-area').value = '';
        DisplayTools();
    })
    .catch(error => {
        console.error('Error adding tool:', error);
    });
});

function DisplayTools() {
    fetchTools(gardenId)
    .then(tools => {
        console.log(tools);

        const toolDropbox = document.getElementById('garden-tool-dropbox');
        toolDropbox.innerHTML = ''
        tools.forEach(tool => {
            const toolDiv = document.createElement('div');
            toolDiv.setAttribute('class', 'garden-dropbox-tool');
            toolDiv.innerText = tool.name;
            toolDropbox.appendChild(toolDiv)

            toolDiv.addEventListener('click', function() {
                document.getElementById('tool-name').innerText = tool.name;
                document.getElementById('tool-category').innerText = tool.category.name;
                document.getElementById('tool-availability').innerText = tool.availability.name
                document.getElementById('tool-last-used-date').innerText = tool.lastUsedDate;
                document.getElementById('tool-description').innerText = tool.description;
            })
        });
    })
    .catch(error => {
        console.error('Error fetching tools')
    });
}

function DisplayCategories() {
    fetchCategories()
        .then(categories => {
            console.log(categories)
            const categorySelection = document.getElementById('tool-category-selection');
            categorySelection.innerHTML = '';

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.innerText = category.name;
                categorySelection.appendChild(option);
            })
        })
        .catch(error => {
            console.error('Error fetching tool categories')
        })
}

function DisplayGardenData() {
    fetchGarden(gardenId)
        .then(garden => {
            document.getElementById('garden-name').innerText = garden.name;
            document.getElementById('garden-size').innerText = garden.size;
            document.getElementById('garden-country').innerText = garden.country;
            document.getElementById('garden-city').innerText = garden.city;
            document.getElementById('garden-street').innerText = garden.street;
            document.getElementById('garden-description').innerText = garden.description;
        })
        .catch(error => {
            console.error('Error fetching garden:', error);
        });
}

function fetchAddTool(url, method, headers, body) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

function fetchGarden(gardenId) {
    return fetch(`/garden/${gardenId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch garden');
            }
            return response.json();
        })
        .then(garden => {
            return garden;
        });
}

function fetchTools(gardenId) {
    return fetch(`/tool/${gardenId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch tools');
            }
            return response.json();
        })
        .then(tools => {
            return tools;
        });
}

function fetchCategories() {
    return fetch('/category/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            return response.json();
        })
        .then(categories => {
            return categories;
        });
}

