const list = document.getElementById('repo-list');

if (!list) {
  console.error('Unable to find the starred repository list.');
} else {
  fetch('events.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load events.json: ${response.status}`);
      }

      return response.json();
    })
    .then((repositories) => {
      if (!Array.isArray(repositories)) {
        throw new Error('events.json did not contain an array of repositories.');
      }

      list.replaceChildren();

      repositories.forEach((repository) => {
        const item = document.createElement('li');
        const article = document.createElement('article');
        const main = document.createElement('div');
        const repoName = document.createElement('a');
        const description = document.createElement('p');
        const meta = document.createElement('div');
        const languageWrap = document.createElement('span');
        const languageDot = document.createElement('span');
        const languageText = document.createElement('span');
        const stars = document.createElement('span');
        const date = document.createElement('span');

        article.className = 'repo';
        main.className = 'repo-main';
        repoName.className = 'repo-name';
        repoName.href = `https://github.com/${repository.name}`;
        repoName.target = '_blank';
        repoName.rel = 'noopener noreferrer';
        repoName.textContent = repository.name;

        description.className = 'repo-description';
        description.textContent = repository.description || 'No description provided.';

        meta.className = 'repo-meta';
        languageDot.className = 'language-dot';
        languageText.textContent = repository.language || 'Unknown';
        languageWrap.appendChild(languageDot);
        languageWrap.appendChild(languageText);

        stars.className = 'repo-stars';
        stars.textContent = `★ ${repository.stargazers_count ?? 0}`;

        meta.appendChild(languageWrap);
        meta.appendChild(stars);

        main.appendChild(repoName);
        main.appendChild(description);
        main.appendChild(meta);

        date.className = 'repo-date';
        date.textContent = repository.updated_at
          ? new Date(repository.updated_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          : 'Unknown date';

        article.appendChild(main);
        article.appendChild(date);
        item.appendChild(article);
        list.appendChild(item);
      });
    })
    .catch((error) => {
      list.replaceChildren();

      const item = document.createElement('li');
      item.className = 'repo-error';
      item.textContent = 'Unable to load starred repositories.';
      list.appendChild(item);

      console.error(error);
    });
}
