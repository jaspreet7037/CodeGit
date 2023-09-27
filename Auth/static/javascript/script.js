document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value;
      const apiUrl = `https://api.github.com/search/repositories?q=${query}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const repositories = data.items; // Assuming 'items' contains the array of repositories in the API response
        
        // Clear previous search results
        resultsContainer.innerHTML = '';

        if (repositories.length === 0) {
          resultsContainer.textContent = 'No projects found.';
        } else {
          repositories.forEach((repo) => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card'); // You can style this class with CSS

            const repoName = document.createElement('h2');
            repoName.textContent = repo.name;

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description;

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View on GitHub';

            // Append elements to the card
            repoCard.appendChild(repoName);
            repoCard.appendChild(repoDescription);
            repoCard.appendChild(repoLink);

            // Append the card to the results container
            resultsContainer.appendChild(repoCard);
          });
        }
      } catch (error) {
        console.error(error);
        resultsContainer.textContent = 'An error occurred while fetching data.';
      }
    });
  });