class EuropeGuessingGame {
  constructor() {
    this.map = null;
    this.selectedCountry = null;
    this.selectedLayer = null;
    this.score = 0;
    this.attempts = 0;
    this.correctAnswers = 0;
    this.countriesLayer = null;
    this.isGameActive = false;
    this.correctCountries = new Set(); // Para rastrear países ya acertados
    
    this.elements = {};
    this.bindElements();
    this.setupEventListeners();
    this.initializeGame();
  }

  bindElements() {
    this.elements = {
      loading: document.getElementById('loading'),
      map: document.getElementById('map'),
      mapInfo: document.getElementById('map-info'),
      selectedText: document.getElementById('selected-text'),
      countryInput: document.getElementById('country-input'),
      validateBtn: document.getElementById('validate-btn'),
      hintBtn: document.getElementById('hint-btn'),
      resetBtn: document.getElementById('reset-btn'),
      feedback: document.getElementById('feedback'),
      score: document.getElementById('score'),
      attempts: document.getElementById('attempts'),
      correct: document.getElementById('correct')
    };
  }

  async initializeGame() {
    try {
      this.showLoading(true);
      await this.initializeMap();
      await this.loadCountriesData();
      this.isGameActive = true;
      this.updateUI();
      this.showLoading(false);
      this.showMessage('¡Juego cargado! Selecciona un país para comenzar', 'info');
    } catch (error) {
      console.error('Error initializing game:', error);
      this.showLoading(false);
      this.showMessage('Error al cargar el juego. Por favor, recarga la página.', 'error');
    }
  }

  showLoading(show) {
    this.elements.loading.classList.toggle('hidden', !show);
  }

  async initializeMap() {
    // Crear el mapa
    this.map = L.map(this.elements.map, {
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      minZoom: mapConfig.minZoom,
      maxZoom: mapConfig.maxZoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: false
    });

    // Añadir capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      opacity: 0.7
    }).addTo(this.map);

    // Configurar límites
    const bounds = L.latLngBounds(mapConfig.bounds);
    this.map.setMaxBounds(bounds);
  }

  async loadCountriesData() {
    try {
      // Cargar datos GeoJSON de Europa
      const response = await fetch('https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson');
      
      if (!response.ok) {
        throw new Error('Failed to fetch map data');
      }
      
      const geoData = await response.json();
      
      // Crear capa de países
      this.countriesLayer = L.geoJSON(geoData, {
        style: this.getDefaultStyle.bind(this),
        onEachFeature: this.onEachFeature.bind(this),
        filter: this.filterCountries.bind(this)
      }).addTo(this.map);

    } catch (error) {
      console.error('Error loading countries data:', error);
      this.loadFallbackData();
    }
  }

  loadFallbackData() {
    // Datos de respaldo si falla la carga externa
    const fallbackCountries = [
      { name: 'Spain', center: [40.4637, -3.7492] },
      { name: 'France', center: [46.6034, 1.8883] },
      { name: 'Germany', center: [51.1657, 10.4515] },
      { name: 'Italy', center: [41.8719, 12.5674] },
      { name: 'United Kingdom', center: [55.3781, -3.4360] },
      { name: 'Portugal', center: [39.3999, -8.2245] }
    ];

    fallbackCountries.forEach(country => {
      const marker = L.circleMarker(country.center, {
        radius: 20,
        ...this.getDefaultStyle()
      }).addTo(this.map);

      marker.countryName = country.name;
      marker.on('click', (e) => this.selectCountry(e, country.name));
    });

    this.showMessage('Modo básico cargado - funcionalidad limitada', 'warning');
  }

  getDefaultStyle() {
    return {
      fillColor: mapConfig.colors.default,
      weight: 1,
      opacity: 1,
      color: mapConfig.colors.stroke,
      fillOpacity: 0.7,
      cursor: 'pointer'
    };
  }

  getStyleForCountry(countryName) {
    // Si el país ya fue acertado, mantenerlo verde
    if (this.correctCountries.has(countryName)) {
      return {
        fillColor: mapConfig.colors.correct,
        weight: 2,
        opacity: 1,
        color: '#059669',
        fillOpacity: 0.8,
        cursor: 'pointer'
      };
    }
    return this.getDefaultStyle();
  }

  filterCountries(feature) {
    // Filtrar solo países que están en nuestros datos
    const countryName = this.extractCountryName(feature);
    return europeCountries.hasOwnProperty(countryName);
  }

  extractCountryName(feature) {
    const props = feature.properties;
    return props.NAME || props.name || props.NAME_EN || props.ADMIN || 'Unknown';
  }

  onEachFeature(feature, layer) {
    const countryName = this.extractCountryName(feature);
    const countryData = europeCountries[countryName];
    
    if (!countryData) return;

    // Guardar referencia del nombre del país
    layer.countryName = countryName;

    // Eventos de mouse
    layer.on({
      mouseover: this.highlightCountry.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: (e) => this.selectCountry(e, countryName)
    });

    // NO añadir ningún tooltip
  }

  highlightCountry(e) {
    const layer = e.target;
    const countryName = layer.countryName;
    
    if (this.selectedLayer !== layer && this.isGameActive) {
      // Si ya fue acertado, usar un hover más sutil
      if (this.correctCountries.has(countryName)) {
        layer.setStyle({
          fillColor: '#16a34a', // Verde más oscuro para hover
          weight: 3,
          color: '#047857'
        });
      } else {
        layer.setStyle({
          fillColor: mapConfig.colors.hover,
          weight: 2
        });
      }
    }
  }

  resetHighlight(e) {
    const layer = e.target;
    const countryName = layer.countryName;
    
    if (this.selectedLayer !== layer) {
      layer.setStyle(this.getStyleForCountry(countryName));
    }
  }

  selectCountry(e, countryName) {
    if (!this.isGameActive) return;

    // Resetear país anterior
    if (this.selectedLayer) {
      const prevCountryName = this.selectedLayer.countryName;
      this.selectedLayer.setStyle(this.getStyleForCountry(prevCountryName));
    }

    // Seleccionar nuevo país
    const layer = e.target;
    this.selectedLayer = layer;
    this.selectedCountry = countryName;

    // Aplicar estilo de selección
    layer.setStyle({
      fillColor: mapConfig.colors.selected,
      weight: 3,
      color: '#f59e0b'
    });

    // Actualizar UI sin mostrar el nombre del país
    this.updateMapInfo(`Has seleccionado un país - ¡Escribe su nombre!`);
    this.elements.countryInput.disabled = false;
    this.elements.hintBtn.disabled = false;
    this.elements.countryInput.focus();
    
    this.updateValidateButton();
  }

  updateMapInfo(text) {
    this.elements.selectedText.textContent = text;
    this.elements.mapInfo.classList.remove('hidden');
  }

  validateAnswer() {
    if (!this.selectedCountry || !this.isGameActive) return;

    const userInput = this.elements.countryInput.value.trim();
    if (!userInput) return;

    this.attempts++;
    
    const isCorrect = this.checkAnswer(userInput, this.selectedCountry);
    
    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }

    this.updateUI();
    this.resetInput();
    
    // Auto-reset después de 3 segundos
    setTimeout(() => {
      this.resetSelection();
    }, 3000);
  }

  checkAnswer(userInput, countryName) {
    const countryData = europeCountries[countryName];
    if (!countryData) return false;

    const normalizedInput = this.normalizeString(userInput);
    const correctAnswers = [
      countryData.spanish,
      ...countryData.alternatives
    ].map(answer => this.normalizeString(answer));

    return correctAnswers.includes(normalizedInput);
  }

  normalizeString(str) {
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  handleCorrectAnswer() {
    this.score += 10;
    this.correctAnswers++;
    
    // Agregar país a la lista de acertados
    this.correctCountries.add(this.selectedCountry);
    
    const countryData = europeCountries[this.selectedCountry];
    const message = `¡Correcto! 🎉 Es ${countryData.spanish}. +10 puntos`;
    
    this.showMessage(message, 'success');
    
    // Pintar el país en verde permanentemente
    if (this.selectedLayer) {
      this.selectedLayer.setStyle({
        fillColor: mapConfig.colors.correct,
        weight: 2,
        color: '#059669',
        fillOpacity: 0.8
      });
    }

    this.playSuccessAnimation();
  }

  handleIncorrectAnswer() {
    const countryData = europeCountries[this.selectedCountry];
    const message = `❌ Incorrecto. La respuesta correcta es: ${countryData.spanish}`;
    
    this.showMessage(message, 'error');
    
    if (this.selectedLayer) {
      this.selectedLayer.setStyle({
        fillColor: mapConfig.colors.incorrect,
        weight: 3,
        color: '#dc2626'
      });
    }
  }

  showHint() {
    if (!this.selectedCountry || !this.isGameActive) {
      this.showMessage('Primero selecciona un país en el mapa', 'warning');
      return;
    }

    const countryData = europeCountries[this.selectedCountry];
    const randomHint = countryData.hints[Math.floor(Math.random() * countryData.hints.length)];
    
    this.showMessage(`💡 Pista: ${randomHint}`, 'info');
  }

  showMessage(text, type = 'info', duration = 5000) {
    const feedback = this.elements.feedback;
    
    feedback.className = 'feedback';
    feedback.classList.add(type);
    feedback.innerHTML = text;
    feedback.classList.remove('hidden');

    // Auto-hide después del tiempo especificado
    setTimeout(() => {
      if (feedback.classList.contains(type)) {
        feedback.classList.add('hidden');
      }
    }, duration);
  }

  playSuccessAnimation() {
    if (this.selectedLayer && this.selectedLayer.getElement) {
      const element = this.selectedLayer.getElement();
      if (element) {
        element.classList.add('country-highlight');
        setTimeout(() => {
          element.classList.remove('country-highlight');
        }, 1000);
      }
    }
  }

  resetSelection() {
    if (this.selectedLayer) {
      const countryName = this.selectedLayer.countryName;
      this.selectedLayer.setStyle(this.getStyleForCountry(countryName));
    }
    
    this.selectedLayer = null;
    this.selectedCountry = null;
    this.elements.mapInfo.classList.add('hidden');
    this.elements.countryInput.disabled = true;
    this.elements.hintBtn.disabled = true;
  }

  resetInput() {
    this.elements.countryInput.value = '';
    this.updateValidateButton();
  }

  resetGame() {
    this.score = 0;
    this.attempts = 0;
    this.correctAnswers = 0;
    this.correctCountries.clear(); // Limpiar países acertados
    
    this.resetSelection();
    this.resetInput();
    
    // Resetear todos los países al estilo por defecto
    if (this.countriesLayer) {
      this.countriesLayer.eachLayer(layer => {
        layer.setStyle(this.getDefaultStyle());
      });
    }

    this.updateUI();
    this.showMessage('🔄 Juego reiniciado. ¡Selecciona un país para comenzar!', 'info');
  }

  updateValidateButton() {
    const hasInput = this.elements.countryInput.value.trim().length > 0;
    const hasSelection = this.selectedCountry !== null;
    this.elements.validateBtn.disabled = !(hasInput && hasSelection && this.isGameActive);
  }

  updateUI() {
    this.elements.score.textContent = this.score;
    this.elements.attempts.textContent = this.attempts;
    this.elements.correct.textContent = this.correctAnswers;
  }

  setupEventListeners() {
    // Input de país
    this.elements.countryInput.addEventListener('input', () => {
      this.updateValidateButton();
    });

    this.elements.countryInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.elements.validateBtn.disabled) {
        this.validateAnswer();
      }
    });

    // Botones
    this.elements.validateBtn.addEventListener('click', () => {
      this.validateAnswer();
    });

    this.elements.hintBtn.addEventListener('click', () => {
      this.showHint();
    });

    this.elements.resetBtn.addEventListener('click', () => {
      this.resetGame();
    });

    // Prevenir zoom en móviles
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
      if (this.map) {
        setTimeout(() => {
          this.map.invalidateSize();
        }, 100);
      }
    });
  }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const game = new EuropeGuessingGame();
  
  // Hacer el juego accesible globalmente para debugging
  window.europeGame = game;
});