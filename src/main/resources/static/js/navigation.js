document.getElementsByClassName('navigation')[0].innerHTML = `
<nav class="navigation">
    <a href="/">
        <svg class="logo" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" id="garden-centre">
            <path d="M4,5L4,4.5C4,3.12 5.12,2 6.5,2C7.88,2 9,3.12 9,4.5L9,10.293L11.365,7.928L11.018,6.633C11.018,6.631 11.017,6.629 11.017,6.627L11.016,6.627L11.016,6.627C10.973,6.461 11.016,6.276 11.147,6.146C11.342,5.951 11.659,5.951 11.854,6.146L13.854,8.146C14.049,8.341 14.049,8.658 13.854,8.853C13.724,8.983 13.541,9.027 13.375,8.984C13.375,8.984 13.375,8.984 13.375,8.984C13.372,8.983 13.369,8.982 13.365,8.981L12.072,8.635L9,11.707L9,12C9,12.552 8.552,13 8,13L5,13C4.448,13 4,12.552 4,12L4,11.536L1.732,9.268C0.757,8.292 0.757,6.708 1.732,5.732C2.22,5.244 2.86,5 3.5,5L3.5,5L4,5ZM4,6L3.5,6L3.5,6C3.116,6 2.732,6.147 2.439,6.439C1.854,7.025 1.854,7.975 2.439,8.561L4,10.121L4,6ZM8,5L8,4.5C8,3.672 7.328,3 6.5,3C5.672,3 5,3.672 5,4.5L5,5L8,5Z"/>
        </svg>
    </a>
    <ul>
        <li><a href="/index.html" class="navigation-button">Home</a></li>
        <li><a href="/pages/gardens.html" class="navigation-button">Gardens</a></li>
        <li><a href="/pages/plants.html" class="navigation-button">Plants</a></li>
        <li><a href="/pages/signin.html" id="sign-in-button">Sign In</a></li>
        <li><a href="/pages/signup.html" id="sign-up-button">Sign Up</a></li>
    </ul>
</nav>
`;
