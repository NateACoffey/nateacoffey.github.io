const container = document.getElementById('pokemon-container');
let tracked = JSON.parse(localStorage.getItem("tracked") || "{}");
let data = [];
let currentEventIds = [];
let activeTab = 'all';
let selectedFilter = 'none';
let openOverlay = null;
let hideObtained = false;



Promise.all([
  fetch('pokemon.json').then(res => res.json()),
  fetch('event.json').then(res => res.json())
]).then(([pokemonData, eventIds]) => {
  data = pokemonData;
  currentEventIds = eventIds;
  renderPokemonGrid();
  const filterSelect = document.getElementById('filter-select');

  filterSelect.addEventListener('change', () => {
    selectedFilter = filterSelect.value;
    console.log('Filter changed:', selectedFilter);
    renderPokemonGrid();
  });
});


function renderPokemonGrid() {
  container.innerHTML = '';

  let filteredPokemon;
  if (activeTab === 'all') {
    filteredPokemon = data;
  } else if (activeTab === 'current') {
    
    filteredPokemon = data.filter(p => {
      const isInEvent = currentEventIds.includes(p.id);

      if (selectedFilter === 'none') {
        return isInEvent;
      }

      return isInEvent && p.availableTags.includes(selectedFilter);
    });
  } else {
    filteredPokemon = data.filter(p => p.availableTags.includes(activeTab));
  }

  filteredPokemon = filteredPokemon.filter(p => p.availableInGo !== false);

    if (hideObtained) {
    filteredPokemon = filteredPokemon.filter(pokemon => {
      const tags = tracked[pokemon.id];
      if (!tags) return true;

      if (activeTab === 'current') {
        if (selectedFilter === 'none') {
          return !pokemon.availableTags.some(tag => tags[tag]);
        } else {
          return !tags[selectedFilter];
        }
      } else if (activeTab === 'all') {
        return !Object.values(tags).some(Boolean);
      } else {
        return !tags[activeTab];
      }
    });
  }


  filteredPokemon.forEach(pokemon => {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.dataset.id = pokemon.id;

    const img = document.createElement('img');
    img.src = pokemon.sprite;
    img.alt = pokemon.name;

    const name = document.createElement('div');
    name.textContent = pokemon.name;

    card.appendChild(img);
    card.appendChild(name);

    let overlay = null;

    let isMobile = 'ontouchstart' in window;

      if (activeTab === 'all' || (activeTab === 'current' && selectedFilter === 'none')) {
        if (!isMobile) {
          // Desktop hover
          card.addEventListener('mouseenter', () => {
            if (overlay) return;
            overlay = createTagOverlay(pokemon, card);
            card.appendChild(overlay);
          });

          card.addEventListener('mouseleave', () => {
            if (overlay) {
              card.removeChild(overlay);
              overlay = null;
            }
          });
        } else {
          // Mobile tap toggle
          card.addEventListener('click', e => {
            e.stopPropagation();
        
            // Close any other open overlay
            if (openOverlay && openOverlay !== overlay) {
              openOverlay.remove();
              openOverlay = null;
            }
        
            if (overlay && overlay.parentElement === card) {
              card.removeChild(overlay);
              overlay = null;
              openOverlay = null;
            } else {
              overlay = createTagOverlay(pokemon, card);
              overlay.classList.add('open');
              card.appendChild(overlay);
              openOverlay = overlay;
            }
          });
        }
      } else {
      card.style.cursor = 'pointer';

      const tagToToggle = activeTab === 'current' && selectedFilter !== 'none'
        ? selectedFilter
        : activeTab;

      card.addEventListener('click', () => {
        if (!tracked[pokemon.id]) tracked[pokemon.id] = {};

        const wasSelected = !!tracked[pokemon.id][tagToToggle];
        tracked[pokemon.id][tagToToggle] = !wasSelected;

        if (!wasSelected && tagToToggle !== 'normal') {
          tracked[pokemon.id]['normal'] = true;
        }

        localStorage.setItem("tracked", JSON.stringify(tracked));
        updateCardGreyed(card, pokemon.id);
        renderPokemonGrid();
      });
    }


    container.appendChild(card);
    updateCardGreyed(card, pokemon.id);
  });
}



function createTagOverlay(pokemon, card) {
  const overlay = document.createElement('div');
  overlay.className = 'tag-overlay';

  pokemon.availableTags.forEach(tag => {
    const tagBox = document.createElement('div');
    tagBox.className = 'tag-box';
    tagBox.textContent = tag;

    if (tracked[pokemon.id] && tracked[pokemon.id][tag]) {
      tagBox.classList.add('greyed');
    }

    tagBox.addEventListener('click', e => {
      e.stopPropagation();
      if (!tracked[pokemon.id]) tracked[pokemon.id] = {};
    
      const wasSelected = !!tracked[pokemon.id][tag];
      tracked[pokemon.id][tag] = !wasSelected;
    
      // Also select "normal" if needed
      if (!wasSelected && tag !== 'normal') {
        tracked[pokemon.id]['normal'] = true;
      }
    
      localStorage.setItem("tracked", JSON.stringify(tracked));
      updateCardGreyed(card, pokemon.id);
    
      // Update this tag's visual
      if (tracked[pokemon.id][tag]) {
        tagBox.classList.add('greyed');
      } else {
        tagBox.classList.remove('greyed');
      }
    
      // Update "normal" tag visually if it was just toggled by another tag
      if (tag !== 'normal') {
        const normalTagBox = overlay.querySelector('.tag-box:nth-child(1)');
        if (normalTagBox && tracked[pokemon.id]['normal']) {
          normalTagBox.classList.add('greyed');
        }
      }
    });



    overlay.appendChild(tagBox);
  });

  return overlay;
}



function updateCardGreyed(card, id) {
  const tags = tracked[id];

  if (!tags) {
    card.classList.remove('greyed');
    return;
  }

  if (activeTab === 'current') {
    const pokemon = data.find(p => p.id === id);
    if (!pokemon) {
      card.classList.remove('greyed');
      return;
    }

    if (selectedFilter === 'none') {
      // grey if ANY tag is selected that the Pokémon has
      const anyActiveTag = Object.keys(tags).some(tag =>
        tags[tag] && pokemon.availableTags.includes(tag)
      );
      if (anyActiveTag) {
        card.classList.add('greyed');
      } else {
        card.classList.remove('greyed');
      }
    } else {
      // grey ONLY if selectedFilter tag is selected
      if (tags[selectedFilter]) {
        card.classList.add('greyed');
      } else {
        card.classList.remove('greyed');
      }
    }

  } else if (activeTab === 'all') {
    const anyTagSelected = Object.values(tags).some(v => v);
    if (anyTagSelected) {
      card.classList.add('greyed');
    } else {
      card.classList.remove('greyed');
    }

  } else {
    const isGrey = tags[activeTab];
    if (isGrey) {
      card.classList.add('greyed');
    } else {
      card.classList.remove('greyed');
    }
  }
}



const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



const tabs = document.getElementById('tabs');

tabs.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;

  Array.from(tabs.children).forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  activeTab = e.target.dataset.tab;

  const filterContainer = document.getElementById('filter-container');
  const filterSelect = document.getElementById('filter-select');

  if (activeTab === 'current') {
    filterContainer.style.display = 'block';
  } else {
    filterContainer.style.display = 'none';
    selectedFilter = 'none';
    if (filterSelect) filterSelect.value = 'none';
  }

  renderPokemonGrid();
});



document.addEventListener('click', e => {
  // Delay to allow tag click to register before removing overlay
  setTimeout(() => {
    if (openOverlay && !e.target.closest('.pokemon-card')) {
      openOverlay.remove();
      openOverlay = null;
    }
  }, 50);
});



document.getElementById('hide-obtained').addEventListener('change', e => {
  hideObtained = e.target.checked;
  renderPokemonGrid();
});



