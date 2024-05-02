document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');

    const cardContainer = document.getElementById('garden-card-container');

    fetch(`/garden/gardens?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch gardens');
            }
            return response.json();
        })
        .then(gardens => {
            // Do something with the fetched gardens, for example:
            console.log('Gardens:', gardens);

            gardens.forEach(garden => {
                
                // Create card container
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('garden-card');

                // Create SVG element
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'garden-icon');
                svg.setAttribute('fill', '#000000');
                svg.setAttribute('viewBox', '0 0 100 100');
                svg.setAttribute('version', '1.1');
                svg.setAttribute('xml:space', 'preserve');
                svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

                // Create SVG path
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', 'M96,35c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.1-0.1-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0,0l-22-19 ' +    
                'c0,0-0.1,0-0.1-0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0H42c-0.1,0-0.2,0-0.4,0.1c0,0-0.1,0.1-0.1,0.1   c-0.1,0-0.1,0.1-0.2,0.1l-13,11.2c-0.1-0.5-0.2-1.1-0.3-1.7c-0.1-1-0.2-2-0.7-2.9c-0.7-1.2-1.7-2-2.6-2.6c-0.5-0.3-0.9-0.6-1.2-0.9   c-0.3-0.3-0.6-0.6-0.8-0.9c-0.4-0.4-0.7-0.8-1.1-1.2C21.1,15.7,20.2,15,19,15c-1.6,0-2.7,1.2-3.7,2.4c-0.3,0.3-0.5,0.6-0.8,0.9' +  
                'c-0.3,0.3-0.7,0.6-1.2,1c-0.9,0.7-1.9,1.4-2.6,2.6c-0.5,0.9-0.6,1.9-0.7,2.8c-0.1,0.8-0.2,1.5-0.4,2.2c-0.2,0.5-0.6,1.1-1,1.7   c-0.6,0.8-1.2,1.6-1.5,2.7c-0.3,1-0.2,2-0.2,2.9c0,0.8,0.1,1.5,0,2.1c-0.1,0.6-0.5,1.2-0.8,1.9c-0.5,0.9-0.9,1.7-1.1,2.8   c-0.2,1,0,2,0.2,3c0.1,0.7,0.3,1.4,0.2,2.1c-0.1,0.7-0.3,1.3-0.6,2.1C4.3,49,4,49.9,4,50.9c0,0.9,0.4,1.6,0.7,2.2   c0.2,0.4,0.4,0.8,0.4,1.1c0,0.4-0.1,0.8-0.3,1.3c-0.2,0.7-0.5,1.4-0.3,2.2c0.2,0.9,0.7,1.6,1.2,2.1c0.3,0.3,0.5,0.6,0.6,0.9' +
                'C6.4,61,6.4,61.5,6.4,62c0,0.7-0.1,1.6,0.4,2.3c0.5,0.9,1.4,1.3,2.1,1.6c0.4,0.2,0.7,0.3,0.9,0.5c0.2,0.2,0.4,0.6,0.7,1   c0.4,0.7,0.8,1.5,1.7,1.9c0.4,0.2,0.8,0.3,1.2,0.3c0.4,0,0.8-0.1,1.2-0.1c0.1,0,0.2,0,0.2,0L14.4,78H5c-0.6,0-1,0.4-1,1v5   c0,0.6,0.4,1,1,1h90c0.6,0,1-0.4,1-1v-5L96,35C96,35,96,35,96,35z M65,78V61l14,0v17H65z M33,78V58h8v20H33z M43,58h8v20h-8V58z    M52,56H32c-0.6,0-1,0.4-1,1v21H21V42h30h12v36H53V57C53,56.4,52.6,56,52,56z M42,17.3L61.3,34H22.7L42,17.3z M72.6,17l19.7,17' +   
                'H64.4L44.7,17H72.6z M21,40v-4h42v4H51H21z M65,42h14v17l-14,0V42z M81,42h13v17l-13,0V42z M65,40v-4h29v4H65z M81,61l13,0v17H81   V61z M14.2,67.3c-0.5,0.1-1,0.2-1.3,0c-0.3-0.1-0.5-0.6-0.8-1c-0.3-0.5-0.6-1-1-1.4c-0.4-0.4-0.9-0.6-1.4-0.9    c-0.5-0.2-1-0.5-1.2-0.8c-0.1-0.2-0.1-0.7-0.1-1.2c0-0.6,0-1.3-0.2-2c-0.2-0.6-0.6-1.1-1-1.5c-0.4-0.4-0.7-0.8-0.8-1.2    c0-0.3,0.1-0.7,0.3-1.2c0.2-0.6,0.4-1.3,0.4-2.1c0-0.7-0.4-1.3-0.7-1.8C6.2,51.7,6,51.3,6,50.9c0-0.6,0.3-1.4,0.6-2.1    c0.3-0.8,0.6-1.7,0.7-2.6c0.1-0.9-0.1-1.8-0.3-2.6c-0.2-0.8-0.3-1.6-0.2-2.3c0.1-0.7,0.5-1.4,0.9-2.1c0.4-0.8,0.8-1.5,1-2.4' +    
                'c0.2-0.9,0.1-1.8,0.1-2.7c-0.1-0.8-0.1-1.6,0.1-2.2c0.2-0.7,0.7-1.4,1.2-2.1c0.5-0.7,1-1.4,1.3-2.1c0.3-0.9,0.5-1.8,0.6-2.6     c0.1-0.8,0.2-1.6,0.5-2.1c0.4-0.8,1.3-1.4,2-1.9c0.5-0.4,1-0.7,1.5-1.2c0.3-0.3,0.6-0.7,0.9-1c0.8-0.9,1.5-1.7,2.2-1.7    c0.4,0,0.8,0.2,1.3,0.7c0.3,0.3,0.6,0.7,1,1c0.3,0.3,0.6,0.7,0.9,1c0.4,0.4,0.9,0.8,1.4,1.2c0.8,0.6,1.6,1.1,2,1.9    c0.3,0.5,0.4,1.3,0.5,2.1c0.1,0.9,0.2,1.7,0.5,2.6c0,0.1,0.1,0.2,0.1,0.3L19.6,34c-0.2,0-0.4-0.1-0.6-0.1c-1.6,0-2.8,1.2-2.9,2.7    l-1.3,30.6C14.6,67.3,14.4,67.3,14.2,67.3z M18.1,36.7c0-0.4,0.4-0.8,0.9-0.8V78h' +
                '-2.6L18.1,36.7z M6,83v-3h14h12h20h12h30v3H6z');

                // Append path to SVG
                svg.appendChild(path);

                // Create heading for garden name
                const heading = document.createElement('h3');
                heading.textContent = garden.name;

                // Create button for garden management
                const button = document.createElement('button');
                button.textContent = 'Manage';

                // Append elements to card container
                cardDiv.appendChild(svg);
                cardDiv.appendChild(heading);
                cardDiv.appendChild(button);

                // Append card container to card container in HTML
                cardContainer.insertBefore(cardDiv, cardContainer.firstChild);
            });
        })
        .catch(error => {
            console.error('Error fetching gardens:', error);
        });
});