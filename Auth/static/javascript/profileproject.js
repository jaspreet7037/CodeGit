function toggleInputFields() {
    const inputFields = document.querySelector(".input-fields");
    const addButton = document.getElementById("addButton");

    if (inputFields.style.display === "none" || inputFields.style.display === "") {
        inputFields.style.display = "block";
        addButton.textContent = "Cancel";
    } else {
        inputFields.style.display = "none";
        addButton.textContent = "Add Project";
        clearInputFields();
    }
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("link").value = "";
}

// Function to delete a project card and remove it from local storage
function deleteProject(card) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const cardIndex = Array.from(card.parentElement.children).indexOf(card);
    projects.splice(cardIndex, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    card.remove();
}

// Function to upload a project and display it in a card, then save it to local storage
function uploadProject() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const link = document.getElementById("link").value;

    if (title.trim() === "" || description.trim() === "" || link.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    const projectCard = document.createElement("div");
    projectCard.className = "card";
    projectCard.innerHTML = `
        <button class="delete-button" onclick="deleteProject(this.parentElement)">Delete</button>
        <div class="card-header">${title}</div>
        <div class="card-content">
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${link}" target="_blank">Project Link</a>
        </div>
    `;

    document.getElementById("projectList").appendChild(projectCard);

    // Save the project to local storage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({ title, description, link });
    localStorage.setItem("projects", JSON.stringify(projects));

    // Clear input fields after uploading
    clearInputFields();

    // Hide the input fields
    toggleInputFields();
}

// Load projects from local storage when the page loads
window.onload = function () {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    for (const project of projects) {
        const projectCard = document.createElement("div");
        projectCard.className = "card";
        projectCard.innerHTML = `
            <button class="delete-button" onclick="deleteProject(this.parentElement)">Delete</button>
            <div class="card-header">${project.title}</div>
            <div class="card-content">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">Project Link</a>
            </div>
        `;
        document.getElementById("projectList").appendChild(projectCard);
    }
};