document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.getElementById('character-cards');
    const loadMoreButton = document.getElementById('load-more');
    let page = 1;
  
    async function fetchCharacters(page) {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }
  
    function createCharacterCard(character) {
      const card = document.createElement('div');
      card.classList.add('card');
  
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="card-content">
          <h2>${character.name}</h2>
          <p>Species: ${character.species}</p>
          <p>Status: ${character.status}</p>
        </div>
      `;
  
      return card;
    }
  
    async function loadCharacters() {
      const characters = await fetchCharacters(page);
      characters.forEach(character => {
        const card = createCharacterCard(character);
        characterCards.appendChild(card);
      });
      page++;
    }
  
    loadMoreButton.addEventListener('click', loadCharacters);
  
    // Load the first set of characters on initial load
    loadCharacters();
  });
  