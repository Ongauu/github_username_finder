const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const profileDiv = document.getElementById("profile");

searchBtn.addEventListener("click", getUser);

async function getUser() {

    const username = usernameInput.value;
    if (username === "") {
        alert("Please enter a username");
        return;
    }

    try {

        profileDiv.innerHTML = "<p>Loading...</p>";

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        const data = await response.json();
        if (data.message === "Not Found") {
            profileDiv.innerHTML = "<p>User not found</p>";
            return;
        }

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
