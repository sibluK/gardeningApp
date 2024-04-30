document.addEventListener('DOMContentLoaded', function () {
  // Add event listener to the button
  document.getElementById('create-garden-button').addEventListener('click', function () {
    // Define the data for the new garden
    const gardenData = {
      name: document.getElementById('garden-name-input').value,
      description: document.getElementById('garden-description-input').value,
      size: document.getElementById('garden-size-input').value,
      country: document.getElementById('garden-country-input').value,
      city: document.getElementById('garden-city-input').value,
      street: document.getElementById('garden-street-input').value
    };

    // Make a POST request to create a new garden
    fetch('/garden/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gardenData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create garden');
      }
      return response.json();
    })
    .then(data => {
      console.log('Garden created:', data);
      alert('Garden created successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to create garden. Please try again later.');
    });
  });
});
