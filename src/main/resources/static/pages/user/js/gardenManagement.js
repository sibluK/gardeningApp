const gardenInfoWrapper = document.getElementById('garden-information-wrapper');
const urlParams = new URLSearchParams(window.location.search);
const gardenId = urlParams.get('gardenId');
const userId = localStorage.getItem('userId');

document.addEventListener('DOMContentLoaded', function() {
    DisplayGardenData();
    DisplayTools();
    DisplayUsers();
    DisplayMaterials();
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
        console.error('Error adding tool: ', error);
    });
});

document.getElementById('remove-tool-button').addEventListener('click', function() {
    const formData = {
        gardenId: gardenId,
        toolId: document.getElementById('tool-id').innerText
    };

    const jsonData = JSON.stringify(formData);

    fetchRemoveTool('/tool/remove', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        refreshSelectedToolInfo()
        DisplayTools();
    })
    .catch(error => {
        console.error('Error removing tool: ', error);
    });
});

document.getElementById('add-user-button').addEventListener('click', function() {
    const formData = {
        gardenId: gardenId,
        username: document.getElementById('user-name-input').value
    };

    const jsonData = JSON.stringify(formData);

    fetchAssignUser('/garden/user/assign', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        document.getElementById('user-name-input').value = '';
        DisplayUsers();
    })
    .catch(error => {
        console.error('Error assigning user: ', error);
    });
});

document.getElementById('remove-user-button').addEventListener('click', function() {
    const formData = {
        gardenId: gardenId,
        username: document.getElementById('user-name').innerText
    };

    const jsonData = JSON.stringify(formData);

    fetchRemoveUser('/garden/user/remove', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        refreshSelectedUserInfo();
        DisplayUsers();
    })
    .catch(error => {
        console.error('Error removing user: ', error);
    });
});

document.getElementById('add-material-button').addEventListener('click', function() {
    const formData = {
        name: document.getElementById('material-name-input').value,
        type: document.getElementById('material-type-selection').value,
        quantity: document.getElementById('material-quantity-input').value,
        unit: document.getElementById('material-unit-selection').value,
        expirationDate: document.getElementById('material-expiration-date-input').value,
        description: document.getElementById('material-description-input').value,
        gardenId: gardenId
    };

    const jsonData = JSON.stringify(formData);

    fetchAssignMaterial('/material/add', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        document.getElementById('material-name-input').value = '';
        document.getElementById('material-quantity-input').value = '';
        document.getElementById('material-description-input').value = '';
        DisplayMaterials();
    })
    .catch(error => {
        console.error('Error assigning material: ', error);
    });
});

document.getElementById('remove-material-button').addEventListener('click', function() {
    const formData = {
        gardenId: gardenId,
        materialId: document.getElementById('material-id').innerText
    };

    const jsonData = JSON.stringify(formData);

    fetchRemoveMaterial('/material/remove', 'POST', {
        'Content-Type': 'application/json'
    }, jsonData)
    .then(data => {
        refreshSelectedMaterialInfo();
        DisplayMaterials();
    })
    .catch(error => {
        console.error('Error removing material: ', error);
    });
});

document.getElementById('delete-garden-button').addEventListener('click', function() {
    fetchDeleteGarden(gardenId)
        .then(data => {
            window.location.assign(`/pages/user/html/gardens.html`);
        })
        .catch(error => {
            console.error(`Error removing garden: `, error)
        })
});


function refreshSelectedToolInfo() {
    document.getElementById('tool-id').innerText = '';
    document.getElementById('tool-name').innerText = '';
    document.getElementById('tool-category').innerText = '';
    document.getElementById('tool-availability').innerText = '';
    document.getElementById('tool-last-used-date').innerText = '';
    document.getElementById('tool-description').innerText = '';
}

function refreshSelectedUserInfo() {
    document.getElementById('user-name').innerText = '';
    document.getElementById('user-first-name').innerText = '';
    document.getElementById('user-last-name').innerText = '';
    document.getElementById('user-email').innerText = '';
}

function refreshSelectedMaterialInfo() {
    document.getElementById('material-name').innerText = '';
    document.getElementById('material-type').innerText = '';
    document.getElementById('material-quantity').innerText = '';
    document.getElementById('material-unit').innerText = '';
    document.getElementById('material-expiration-date').innerText = '';
    document.getElementById('material-description').innerText = '';
}

function DisplayMaterials() {
    fetchAssignedMaterials(gardenId)
    .then(materials => {
        console.log(materials);

        const materialDropbox = document.getElementById('garden-material-dropbox');
        materialDropbox.innerHTML = '';

        materials.forEach(material => {
            const materialDiv = document.createElement('div');
            materialDiv.setAttribute('class', 'garden-dropbox-material');
            materialDiv.innerText = material.name;
            materialDropbox.appendChild(materialDiv);

            materialDiv.addEventListener('click', function() {
                document.getElementById('material-id').innerText = material.id;
                document.getElementById('material-name').innerText = material.name;
                document.getElementById('material-type').innerText = material.type;
                document.getElementById('material-quantity').innerText = material.quantity;
                document.getElementById('material-unit').innerText = material.unit;
                document.getElementById('material-expiration-date').innerText = material.expirationDate;
                document.getElementById('material-description').innerText = material.description;
            });
        });
    })
}

function DisplayUsers() {
    fetchAssignedUsers(gardenId)
    .then(users => {
        console.log(users);

        const userDropbox = document.getElementById('garden-user-dropbox');
        userDropbox.innerHTML = '';

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.setAttribute('class', 'garden-dropbox-user');
            userDiv.innerText = user.username;
            userDropbox.appendChild(userDiv);

            userDiv.addEventListener('click', function() {
                document.getElementById('user-name').innerText = user.username;
                document.getElementById('user-first-name').innerText = user.firstName;
                document.getElementById('user-last-name').innerText = user.lastName;
                document.getElementById('user-email').innerText = user.email;
            })
        })
    })
}

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
                document.getElementById('tool-id').innerText = tool.id;
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

function fetchRemoveTool(url, method, headers, body) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.text();
    })
    .then(data => {
        console.log('Tool removed from garden:', data)
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

function fetchAssignUser(url, method, headers, body) {
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

function fetchRemoveUser(url, method, headers, body) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.text();
    })
    .then(data => {
        console.log('User removed from garden:', data)
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

function fetchAssignMaterial(url, method, headers, body) {
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

function fetchRemoveMaterial(url, method, headers, body) {
    return fetch(url, {
        method: method,
        headers: headers,
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.text();
    })
    .then(data => {
        console.log('Material removed from garden:', data)
        return data;
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
                throw new Error('Failed to fetch tool categories');
            }
            return response.json();
        })
        .then(categories => {
            return categories;
        });
}

function fetchAssignedUsers(gardenId) {
    return fetch(`/user/assigned/${gardenId}/${userId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch garden users');
            }
            return response.json();
        })
        .then(users => {
            return users;
        });
}

function fetchAssignedMaterials(gardenId) {
    return fetch(`/material/${gardenId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch garden materials');
            }
            return response.json();
        })
        .then(tools => {
            return tools;
        });
}

function fetchDeleteGarden(gardenId) {
    return fetch(`/garden/delete/${gardenId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete garden');
            }
            return response.text();
        })
        .then(data => {
            console.log('Garden removed:', data)
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

