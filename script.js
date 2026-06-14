// Get button element
const searchBtn = document.getElementById("searchBtn");

// Get input element
const usernameInput = document.getElementById("username");

// Get profile container
const profileDiv = document.getElementById("profile");


// Add click event to button
searchBtn.addEventListener("click", getUser);



// Async function to fetch GitHub user
async function getUser() {

    // Get username typed by user
    const username = usernameInput.value;

    // If input is empty
    if (username === "") {
        alert("Please enter a username");
        return;
    }

    try {

        // Show loading message
        profileDiv.innerHTML = "<p>Loading...</p>";

        // Fetch data from GitHub API
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        // Convert response to JSON
        const data = await response.json();

        // If user not found
        if (data.message === "Not Found") {
            profileDiv.innerHTML = "<p>User not found</p>";
            return;
        }

        // Display user data
        profileDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar">

            <h2>${data.name}</h2>

            <p>${data.bio || "No bio available"}</p>

            <p>Followers: ${data.followers}</p>

            <p>Public Repos: ${data.public_repos}</p>

            <a href="${data.html_url}" target="_blank">
                Visit Profile
            </a>
        `;

    } catch (error) {

        // If something fails
        profileDiv.innerHTML = `
            <p>Something went wrong</p>
        `;

        console.log(error);
    }
}