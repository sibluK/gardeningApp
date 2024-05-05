const gardenInfoWrapper = document.getElementById('garden-information-wrapper');

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gardenId = urlParams.get('gardenId');

    //console.log(localStorage.getItem('userId'));
    //console.log(gardenId);

    fetchGarden(gardenId)
        .then(garden => {
            // Do something with the fetched garden data
            //console.log('Garden:', garden);
            //onsole.log(garden.name);
            //console.log(garden.description);
            //console.log(garden.size);
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
            });
        })
        .catch(error => {
            console.error('Error fetching tools')
        });
});

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
        })
}
