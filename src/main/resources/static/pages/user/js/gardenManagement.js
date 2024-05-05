document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gardenId = urlParams.get('gardenId');

    console.log(localStorage.getItem('userId'));
    console.log(gardenId);

    fetchGarden(gardenId)
        .then(garden => {
            // Do something with the fetched garden data
            console.log('Garden:', garden);
            console.log(garden.name);
            console.log(garden.description);
            console.log(garden.size);
        })
        .catch(error => {
            console.error('Error fetching garden:', error);
        });
});

document.getElementById('garden-information-wrapper')

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
