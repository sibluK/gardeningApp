document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');

    const link = document.createElement('a');
    link.setAttribute('href', '/pages/user/html/profile.html');
    link.setAttribute('class', 'navigation-button');
    link.innerHTML = username;

    // Create the <li> tag
    const listItem = document.createElement('li');
    listItem.appendChild(link); // Append the <a> tag to the <li> tag

    // Find the navigation menu and append the new <li> tag
    const navigation = document.querySelector('.navigation ul');
    navigation.appendChild(listItem);

    document.getElementById('sign-out-button').addEventListener('click', function () {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    });
});
