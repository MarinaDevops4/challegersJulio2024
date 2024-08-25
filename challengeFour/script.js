document.addEventListener("DOMContentLoaded", () => {
    const handCards = document.getElementById('hand-cards');
    const playedCards = document.getElementById('player-played-cards');
    const opponentHandCards = document.getElementById('opponent-hand-cards');
    const opponentPlayedCards = document.getElementById('opponent-played-cards');
    const drawCardButton = document.getElementById('draw-card');
    const playCardButton = document.getElementById('play-card');
    const resultMessage = document.getElementById('result-message');

    let playerHand = [];
    let opponentHand = [];
    let deck = [];
    let selectedCardIndex = -1;

    drawCardButton.addEventListener('click', drawCard);
    playCardButton.addEventListener('click', playCard);

    fetchDeckFromAPI().then(fetchedDeck => {
        deck = fetchedDeck;
        if (deck.length < 10) {
            alert("No se pudieron cargar suficientes cartas. Por favor, recarga la página.");
        }
    });

    async function fetchDeckFromAPI() {
        const apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0";
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.data
            .filter(card => card.atk !== undefined && card.def !== undefined)
            .map(card => ({
                name: card.name,
                attack: card.atk,
                defense: card.def,
                imageUrl: card.card_images[0].image_url
            }));
        } catch (error) {
            console.error("Error al obtener las cartas de la API:", error);
            return [];
        }
    }

    function drawCard() {
        if (deck.length < 2) {
            alert("No quedan más cartas en el mazo.");
            return;
        }

        // Robar una carta para el jugador
        const playerCard = deck.pop();
        playerHand.push(playerCard);
        renderHand(playerHand, handCards, selectPlayerCard);

        // Robar una carta para el oponente
        const opponentCard = deck.pop();
        opponentHand.push(opponentCard);
        renderHand(opponentHand, opponentHandCards, () => {});

        playCardButton.disabled = false;
    }

    function playCard() {
        if (selectedCardIndex === -1) return;

        // Jugar la carta del jugador
        const playerCard = playerHand.splice(selectedCardIndex, 1)[0];
        playedCards.appendChild(createCardElement(playerCard));
        renderHand(playerHand, handCards, selectPlayerCard);

        // Jugar la carta del oponente (aleatoriamente)
        const opponentCardIndex = Math.floor(Math.random() * opponentHand.length);
        const opponentCard = opponentHand.splice(opponentCardIndex, 1)[0];
        opponentPlayedCards.appendChild(createCardElement(opponentCard));

        // Determinar el ganador del turno
        determineWinner(playerCard, opponentCard);

        selectedCardIndex = -1;
        playCardButton.disabled = true;
    }

    function renderHand(hand, container, onClick) {
        container.innerHTML = '';
        hand.forEach((card, index) => {
            const cardElement = createCardElement(card);
            cardElement.addEventListener('click', () => onClick(index, cardElement));
            container.appendChild(cardElement);
        });
    }

    function selectPlayerCard(index, cardElement) {
        const allCards = handCards.querySelectorAll('.card');
        allCards.forEach(card => card.classList.remove('selected'));
        cardElement.classList.add('selected');
        selectedCardIndex = index;
    }

    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = card.name;

        const cardStats = document.createElement('div');
        cardStats.classList.add('card-stats');
        cardStats.innerHTML = `ATK: ${card.attack}<br>DEF: ${card.defense}`;

        const cardImage = document.createElement('img');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;

        cardFront.appendChild(cardImage);
        cardFront.appendChild(cardTitle);
        cardFront.appendChild(cardStats);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);

        return cardDiv;
    }

    function determineWinner(playerCard, opponentCard) {
        if (playerCard.attack > opponentCard.attack) {
            showModal(`¡Ganaste el turno! ${playerCard.name} venció a ${opponentCard.name}`);
        } else if (playerCard.attack < opponentCard.attack) {
            showModal(`Perdiste el turno. ${opponentCard.name} venció a ${playerCard.name}`);
        } else {
            showModal(`Empate en el turno. ${playerCard.name} y ${opponentCard.name} tienen la misma fuerza`);
        }
    }

    function showModal(message) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }
});
