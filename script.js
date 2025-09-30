class EuropeGuessingGame {
    constructor() {
        this.map = null;
        this.selectedCountry = null;
        this.selectedLayer = null;
        this.score = 0;
        this.attempts = 0;
        this.countriesLayer = null;
        this.currentCountryData = null;
        
        this.initializeGame();
        this.setupEventListeners();
    }

    async initializeGame() {
        this.initializeMap();
        await this.loadCountries();
        this.updateScore();
    }

    initializeMap() {
        // Configurar el mapa centrado en Europa
        this.map = L.map('map', {
            center: [54.5260, 15.2551],
            zoom: 4,
            minZoom: 3,
            maxZoom: 7,
            zoomControl: true,
            scrollWheelZoom: true
        });

        // Añadir capa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            opacity: 0.7
        }).addTo(this.map);

        // Configurar límites del mapa para Europa
        const europeBounds = L.latLngBounds([35.0, -10.0], [71.0, 40.0]);
        this.map.setMaxBounds(europeBounds);
    }

    async loadCountries() {
        try {
            // Cargar datos de países europeos desde una API pública
            const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
            const worldData = await response.json();
            
            // Filtrar solo países europeos
            const europeanCountries = this.filterEuropeanCountries(worldData);
            
            // Crear capa de países
            this.countriesLayer = L.geoJSON(europeanCountries, {
                style: (feature) => ({
                    fillColor: '#e2e8f0',
                    weight: 1,
                    opacity: 1,
                    color: '#4a5568',
                    fillOpacity: 0.6
                }),
                onEachFeature: (feature, layer) => {
                    const countryName = this.getCountryName(feature.properties);
                    
                    layer.on({
                        mouseover: (e) => this.highlightCountry(e),
                        mouseout: (e) => this.resetHighlight(e),
                        click: (e) => this.selectCountry(e, countryName)
                    });

                    layer.bindTooltip(countryName, {
                        permanent: false,
                        direction: 'center',
                        className: 'country-tooltip'
                    }).closeTooltip();
                }
            }).addTo(this.map);

        } catch (error) {
            console.error('Error loading countries:', error);
            this.loadFallbackCountries();
        }
    }

    filterEuropeanCountries(worldData) {
        const europeanCountryNames = [
            'Spain', 'France', 'Germany', 'Italy', 'United Kingdom', 'Portugal',
            'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland', 
            'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Greece',
            'Sweden', 'Norway', 'Denmark', 'Finland', 'Ireland', 'Croatia',
            'Slovenia', 'Slovakia', 'Serbia', 'Bosnia and Herzegovina',
            'Montenegro', 'Albania', 'North Macedonia', 'Kosovo', 'Estonia',
            'Latvia', 'Lithuania', 'Belarus', 'Ukraine', 'Moldova'
        ];

        return {
            type: 'FeatureCollection',
            features: worldData.features.filter(feature => {
                const name = this.getCountryName(feature.properties);
                return europeanCountryNames.includes(name);
            })
        };
    }

    getCountryName(properties) {
        return properties.NAME || properties.name || properties.NAME_EN || 'Unknown';
    }

    loadFallbackCountries() {
        // Si falla la carga de la API, usar países básicos
        const basicCountries = [
            {
                name: 'España',
                center: [40.4637, -3.7492],
                bounds: [[43.7916, 9.3017], [36.0001, -9.3015]]
            },
            {
                name: 'Francia', 
                center: [46.6034, 1.8883],
                bounds: [[51.0890, 9.5597], [41.3336, -5.1406]]
            },
            {
                name: 'Alemania',
                center: [51.1657, 10.4515], 
                bounds: [[55.0815, 15.0419], [47.2701, 5.8663]]
            },
            {
                name: 'Italia',
                center: [41.8719, 12.5674],
                bounds: [[47.0920, 18.7975], [35.4929, 6.6267]]
            }
        ];

        basicCountries.forEach(country => {
            const bounds = L.latLngBounds(country.bounds);
            const rect = L.rectangle(bounds, {
                fillColor: '#e2e8f0',
                weight: 1,
                opacity: 1,
                color: '#4a5568',
                fillOpacity: 0.6
            }).addTo(this.map);

            rect.on('click', () => this.selectCountry({target: rect}, country.name));
            rect.bindTooltip(country.name);
        });

        // Mostrar mensaje de modo fallback
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');
        feedback.innerHTML = '⚠️ Usando modo básico - algunos países pueden no estar disponibles';
        feedback.style.background = '#f6ad55';
        feedback.style.color = 'white';
        
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 3000);
    }

    highlightCountry(e) {
        const layer = e.target;
        if (this.selectedLayer !== layer) {
            layer.setStyle({
                fillColor: '#cbd5e0',
                weight: 2,
                fillOpacity: 0.8
            });
        }
    }

    resetHighlight(e) {
        const layer = e.target;
        if (this.selectedLayer !== layer) {
            layer.setStyle({
                fillColor: '#e2e8f0',
                weight: 1,
                fillOpacity: 0.6
            });
        }
    }

    selectCountry(e, countryName) {
        // Resetear país previamente seleccionado
        if (this.selectedLayer) {
            this.selectedLayer.setStyle({
                fillColor: '#e2e8f0',
                weight: 1,
                fillOpacity: 0.6
            });
        }

        // Seleccionar nuevo país
        const layer = e.target;
        this.selectedLayer = layer;
        this.selectedCountry = this.translateCountryName(countryName);
        this.currentCountryData = europeanCountries[this.selectedCountry];

        // Estilo de país seleccionado
        layer.setStyle({
            fillColor: '#ffd700',
            weight: 3,
            color: '#f59e0b',
            fillOpacity: 0.8
        });

        // Mostrar información del país seleccionado
        this.showCountryInfo();
        
        // Habilitar botón de validación
        document.getElementById('validate-btn').disabled = false;
        
        // Focus en el input
        document.getElementById('country-input').focus();
    }

    translateCountryName(englishName) {
        const translations = {
            'Spain': 'España',
            'France': 'Francia',
            'Germany': 'Alemania', 
            'Italy': 'Italia',
            'United Kingdom': 'Reino Unido',
            'Portugal': 'Portugal',
            'Netherlands': 'Países Bajos',
            'Belgium': 'Bélgica',
            'Switzerland': 'Suiza',
            'Austria': 'Austria',
            'Poland': 'Polonia',
            'Czech Republic': 'República Checa',
            'Hungary': 'Hungría',
            'Romania': 'Rumanía',
            'Bulgaria': 'Bulgaria',
            'Greece': 'Grecia',
            'Sweden': 'Suecia',
            'Norway': 'Noruega',
            'Denmark': 'Dinamarca',
            'Finland': 'Finlandia',
            'Ireland': 'Irlanda',
            'Croatia': 'Croacia',
            'Slovenia': 'Eslovenia',
            'Slovakia': 'Eslovaquia',
            'Serbia': 'Serbia'
        };
        
        return translations[englishName] || englishName;
    }

    showCountryInfo() {
        const countryInfo = document.getElementById('country-info');
        const selectedCountryText = document.getElementById('selected-country');
        
        selectedCountryText.textContent = 'País seleccionado - ¡Escribe su nombre!';
        countryInfo.classList.remove('hidden');
    }

    validateAnswer() {
        const input = document.getElementById('country-input');
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = this.selectedCountry.toLowerCase();
        
        this.attempts++;
        
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden', 'correct', 'incorrect');
        
        // Normalizar respuestas
        const normalizedUser = this.normalizeString(userAnswer);
        const normalizedCorrect = this.normalizeString(correctAnswer);
        
        const isCorrect = normalizedUser === normalizedCorrect || 
                         this.checkAlternativeNames(normalizedUser, correctAnswer);
        
        if (isCorrect) {
            this.handleCorrectAnswer(feedback);
        } else {
            this.handleIncorrectAnswer(feedback, correctAnswer);
        }
        
        this.updateScore();
        
        // Limpiar input y deshabilitar botón
        input.value = '';
        document.getElementById('validate-btn').disabled = true;
        
        // Ocultar info del país después de un tiempo
        setTimeout(() => {
            document.getElementById('country-info').classList.add('hidden');
        }, 3000);
    }

    normalizeString(str) {
        return str.toLowerCase()
                 .normalize("NFD")
                 .replace(/[\u0300-\u036f]/g, "")
                 .replace(/[^\w\s]/g, "")
                 .replace(/\s+/g, " ")
                 .trim();
    }

    checkAlternativeNames(userAnswer, correctAnswer) {
        const alternatives = {
            'españa': ['spain', 'espana'],
            'alemania': ['germany', 'deutschland'],
            'francia': ['france'],
            'reino unido': ['uk', 'united kingdom', 'gran bretaña', 'gran bretana', 'inglaterra', 'england'],
            'países bajos': ['holanda', 'netherlands', 'holland', 'paises bajos'],
            'república checa': ['chequia', 'czech republic', 'republica checa'],
            'suiza': ['switzerland'],
            'italia': ['italy'],
            'portugal': ['portugal'],
            'bélgica': ['belgium', 'belgica'],
            'austria': ['austria'],
            'polonia': ['poland'],
            'hungría': ['hungary', 'hungria'],
            'rumanía': ['romania', 'rumania'],
            'bulgaria': ['bulgaria'],
            'grecia': ['greece'],
            'suecia': ['sweden'],
            'noruega': ['norway'],
            'dinamarca': ['denmark'],
            'finlandia': ['finland'],
            'irlanda': ['ireland'],
            'croacia': ['croatia'],
            'eslovenia': ['slovenia'],
            'eslovaquia': ['slovakia'],
            'serbia': ['serbia']
        };
        
        const normalized = this.normalizeString(correctAnswer);
        if (alternatives[normalized]) {
            return alternatives[normalized].includes(userAnswer);
        }
        
        return false;
    }

    handleCorrectAnswer(feedback) {
        this.score += 10;
        feedback.textContent = `¡Correcto! 🎉 Es ${this.selectedCountry}. +10 puntos`;
        feedback.classList.add('correct');
        
        if (this.selectedLayer) {
            this.selectedLayer.setStyle({
                fillColor: '#48bb78',
                weight: 3,
                color: '#38a169',
                fillOpacity: 0.8
            });
        }
        
        this.playSuccessAnimation();
    }

    handleIncorrectAnswer(feedback, correctAnswer) {
        feedback.innerHTML = `❌ Incorrecto. El país correcto es <strong>${correctAnswer}</strong>`;
        feedback.classList.add('incorrect');
        
        if (this.selectedLayer) {
            this.selectedLayer.setStyle({
                fillColor: '#f56565',
                weight: 3,
                color: '#e53e3e',
                fillOpacity: 0.8
            });
        }
    }

    playSuccessAnimation() {
        if (this.selectedLayer) {
            const element = this.selectedLayer.getElement();
            if (element) {
                element.classList.add('country-selected');
                setTimeout(() => {
                    element.classList.remove('country-selected');
                }, 1000);
            }
        }
    }

    showHint() {
        if (!this.selectedCountry || !this.currentCountryData) {
            alert('Primero selecciona un país en el mapa');
            return;
        }
        
        const hints = this.currentCountryData.hints;
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden', 'correct', 'incorrect');
        feedback.innerHTML = `💡 <strong>Pista:</strong> ${randomHint}`;
        feedback.style.background = 'linear-gradient(135deg, #4299e1, #3182ce)';
        feedback.style.color = 'white';
    }

    resetGame() {
        this.score = 0;
        this.attempts = 0;
        this.selectedCountry = null;
        this.currentCountryData = null;

        if (this.countriesLayer) {
            this.countriesLayer.eachLayer(layer => {
                layer.setStyle({
                    fillColor: '#e2e8f0',
                    weight: 1,
                    opacity: 1,
                    color: '#4a5568',
                    fillOpacity: 0.6
                });
            });
        }
        
        this.selectedLayer = null;
        
        document.getElementById('country-input').value = '';
        document.getElementById('validate-btn').disabled = true;
        document.getElementById('country-info').classList.add('hidden');
        document.getElementById('feedback').classList.add('hidden');
        
        this.updateScore();
        
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden', 'correct', 'incorrect');
        feedback.innerHTML = '🔄 <strong>Juego reiniciado</strong> - ¡Selecciona un país para comenzar!';
        feedback.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        feedback.style.color = 'white';
        
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 2000);
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('attempts').textContent = this.attempts;
    }

    setupEventListeners() {
        const countryInput = document.getElementById('country-input');
        const validateBtn = document.getElementById('validate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const hintBtn = document.getElementById('hint-btn');

        countryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !validateBtn.disabled) {
                this.validateAnswer();
            }
        });

        countryInput.addEventListener('input', (e) => {
            const hasText = e.target.value.trim().length > 0;
            const hasSelection = this.selectedCountry !== null;
            validateBtn.disabled = !(hasText && hasSelection);
        });

        validateBtn.addEventListener('click', () => this.validateAnswer());
        resetBtn.addEventListener('click', () => this.resetGame());
        hintBtn.addEventListener('click', () => this.showHint());
    }
}

// Inicializar juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new EuropeGuessingGame();
});

// Prevenir zoom en dispositivos móviles
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Agregar estilos CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    .country-tooltip {
        background: rgba(0,0,0,0.8) !important;
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        font-size: 12px !important;
    }
    
    .leaflet-tooltip-top:before {
        border-top-color: rgba(0,0,0,0.8) !important;
    }
`;
document.head.appendChild(style);