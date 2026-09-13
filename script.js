const list = document.getElementById('repo-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not load events.json');
    }

    return response.json();
  })
  .then((repositories) => {
    repositories.forEach((repository) => {
      const item = document.createElement('li');

      item.innerHTML = `
        <article class="repo">
          <div class="repo-main">
            <a class="repo-name" href="https://github.com/${repository.name}" target="_blank" rel="noreferrer">
              ${repository.name}
            </a>
            <p class="repo-description">${repository.description}</p>
            <div class="repo-meta">
              <span><span class="language-dot"></span>${repository.language}</span>
              <span class="repo-stars">★ ${repository.stargazers_count}</span>
            </div>
          </div>
          <span class="repo-date">${new Date(repository.updated_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</span>
        </article>
      `;

      list.appendChild(item);
    });
  })
  .catch((error) => {
    const item = document.createElement('li');
    item.textContent = 'Unable to load starred repositories.';
    list.appendChild(item);
    console.error(error);
  });
