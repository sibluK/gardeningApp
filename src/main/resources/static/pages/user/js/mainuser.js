const userId = localStorage.getItem('userId');
const numberOfGardens = document.getElementById('number-of-gardens');
const numberOfTasks = document.getElementById('number-of-tasks');
const numberOfNewPlants = document.getElementById('number-of-new-plants');

document.addEventListener('DOMContentLoaded', function () {

    fetch(`/garden/all/number/${userId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch number of gardens');
            }
            return response.json();
        })
        .then(number => {
            numberOfGardens.innerText = number;
        })
        .catch(error => {
            console.error(`Error fetching number of gardens: `, error)
        })

    fetch(`/task/all/number/${userId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Failed to fetch number of tasks`);
            }
            return response.json();
        })
        .then(number => {
            numberOfTasks.innerHTML = number;
        })
        .catch(error => {
            console.error(`Error fetching number of tasks: `, error)
        })
});

document.getElementById('check-gardens-button').addEventListener('click', function() {
    window.location.assign(`/pages/user/html/gardens.html`);
});

document.getElementById('check-tasks-button').addEventListener('click', function() {
    window.location.assign(`/pages/user/html/tasks.html`);
});

document.getElementById('check-new-plants-button').addEventListener('click', function() {
    window.location.assign(`/pages/user/html/plants.html`);
});


