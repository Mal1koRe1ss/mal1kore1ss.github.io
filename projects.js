// projects.js
document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.getElementById('mainContainer');
    if (mainContainer) mainContainer.classList.add('projects-page');
    fetchGitHubProjects();
});

async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    const username = 'Mal1koRe1ss';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const repos = await response.json();
        
        const filteredRepos = repos
            .filter(repo => !repo.fork && !repo.private)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 12);
        
        if (filteredRepos.length === 0) return showNoProjects();
        
        displayProjects(filteredRepos);
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        showError();
    }
}

function displayProjects(repos) {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';
    
    repos.forEach((repo, index) => {
        projectsContainer.appendChild(createProjectCard(repo, index));
    });
}

function createProjectCard(repo, index) {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'project-card';
    card.style.setProperty('--index', index);
    
    const title = document.createElement('h3');
    title.textContent = repo.name;
    
    const description = document.createElement('p');
    description.textContent = repo.description || 'No description available';
    
    const meta = document.createElement('div');
    meta.className = 'project-meta';
    
    if (repo.language) {
        const language = document.createElement('span');
        language.className = 'language';
        language.textContent = repo.language;
        meta.appendChild(language);
    }
    
    if (repo.stargazers_count > 0) {
        const stars = document.createElement('span');
        stars.className = 'stars';
        stars.innerHTML = `<i class="ri-star-line"></i> ${repo.stargazers_count}`;
        meta.appendChild(stars);
    }
    
    if (repo.forks_count > 0) {
        const forks = document.createElement('span');
        forks.className = 'forks';
        forks.innerHTML = `<i class="ri-git-branch-line"></i> ${repo.forks_count}`;
        meta.appendChild(forks);
    }
    
    const updated = document.createElement('span');
    updated.className = 'updated';
    updated.textContent = formatDate(repo.updated_at);
    meta.appendChild(updated);
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(meta);
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${Math.floor(diffDays)} days ago`;
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
}

function showError() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = `
        <div class="error-message">
            <i class="ri-error-warning-line"></i>
            <p>Failed to load projects. Please try again later.</p>
        </div>
    `;
}

function showNoProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = `
        <div class="no-projects">
            <i class="ri-folder-line"></i>
            <p>No public projects found.</p>
        </div>
    `;
}

// Inject fixed CSS
const style = document.createElement('style');
style.textContent = `
    .project-card {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
    .project-card h3 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 0;
    }
    
    .project-card p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        max-height: 4.5em;
        line-height: 1.4;
        margin-bottom: 8px;
    }
    
    .project-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        font-size: 0.8rem;
        margin-top: auto;
        flex-shrink: 0;
    }
    
    @media (max-width: 768px) {
        .project-card {
            min-height: 120px;
        }
        
        .project-card p {
            -webkit-line-clamp: 2;
            max-height: 3em;
        }
    }
`;
document.head.appendChild(style);