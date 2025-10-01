class EuropeGame {
    constructor() {
        this.countries = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        this.gameQuestions = [];
        this.selectedAnswer = null;
        
        this.initializeElements();
        this.loadCountriesData();
    }

    async loadCountriesData() {
        try {
            console.log('Cargando datos de países...');
            
            // Verificar si countriesData ya existe (cargado desde data.js)
            if (typeof countriesData !== 'undefined' && countriesData.length > 0) {
                console.log('Datos cargados desde data.js:', countriesData.length, 'países');
                this.countries = countriesData;
                this.startGame();
                return;
            }
            
            // Si no existe, intentar cargar dinámicamente
            const response = await fetch('./data.js');
            if (response.ok) {
                const text = await response.text();
                // Evaluar el contenido del archivo para obtener countriesData
                eval(text);
                if (typeof countriesData !== 'undefined') {
                    this.countries = countriesData;
                    console.log('Datos cargados dinámicamente:', this.countries.length, 'países');
                    this.startGame();
                } else {
                    throw new Error('countriesData no encontrado después de cargar data.js');
                }
            } else {
                throw new Error('No se pudo cargar data.js');
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
            this.showError('Error cargando el juego. Por favor, recarga la página.');
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            background: #f44336;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px;
            text-align: center;
            font-size: 1.1rem;
        `;
        errorDiv.textContent = message;
        
        const container = document.querySelector('.game-container');
        container.innerHTML = '';
        container.appendChild(errorDiv);
        
        // Botón para recargar
        const reloadBtn = document.createElement('button');
        reloadBtn.textContent = '🔄 Recargar';
        reloadBtn.style.cssText = `
            background: white;
            color: #f44336;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 10px;
        `;
        reloadBtn.onclick = () => window.location.reload();
        errorDiv.appendChild(reloadBtn);
    }

    initializeElements() {
        this.questionContainer = document.getElementById('questionContainer');
        this.finalScoreContainer = document.getElementById('finalScore');
        this.flagImage = document.getElementById('flagImage');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.nextButton = document.getElementById('nextButton');
        this.restartButton = document.getElementById('restartButton');
        this.questionNumberEl = document.getElementById('questionNumber');
        this.scoreEl = document.getElementById('score');
        this.correctEl = document.getElementById('correct');
        this.progressBar = document.getElementById('progressBar');
        this.finalScoreText = document.getElementById('finalScoreText');
        this.scoreMessage = document.getElementById('scoreMessage');

        // Event listeners
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextQuestion());
        }
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => this.restartGame());
        }
    }

    startGame() {
        if (!this.countries || this.countries.length === 0) {
            console.error('No hay datos de países disponibles');
            this.showError('No se pudieron cargar los datos del juego.');
            return;
        }

        console.log('Iniciando juego...', this.countries.length, 'países disponibles');
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.gameQuestions = this.generateGameQuestions();
        
        if (this.questionContainer) this.questionContainer.style.display = 'block';
        if (this.finalScoreContainer) this.finalScoreContainer.style.display = 'none';
        
        this.showQuestion();
    }

    generateGameQuestions() {
        console.log('Generando preguntas del juego...');
        const shuffled = [...this.countries].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, this.totalQuestions);
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.totalQuestions) {
            this.endGame();
            return;
        }

        const currentQuestion = this.gameQuestions[this.currentQuestionIndex];
        console.log('Mostrando pregunta:', currentQuestion);
        
        // Actualizar la imagen de la bandera
        if (this.flagImage) {
            this.flagImage.src = currentQuestion.flag;
            this.flagImage.alt = `Bandera de ${currentQuestion.name}`;
            
            // Manejar error de carga de imagen
            this.flagImage.onerror = () => {
                console.error('Error cargando bandera:', currentQuestion.flag);
                this.flagImage.alt = `⚠️ Error cargando bandera de ${currentQuestion.name}`;
                this.flagImage.style.display = 'none';
            };
            
            this.flagImage.onload = () => {
                console.log('Bandera cargada correctamente:', currentQuestion.name);
                this.flagImage.style.display = 'block';
            };
        }
        
        // Actualizar stats
        if (this.questionNumberEl) this.questionNumberEl.textContent = this.currentQuestionIndex + 1;
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.correctEl) this.correctEl.textContent = this.correctAnswers;
        
        // Actualizar barra de progreso
        if (this.progressBar) {
            const progress = ((this.currentQuestionIndex) / this.totalQuestions) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
        
        // Generar opciones
        this.generateOptions(currentQuestion);
        
        // Ocultar botón siguiente
        if (this.nextButton) this.nextButton.style.display = 'none';
        this.selectedAnswer = null;
    }

    generateOptions(correctCountry) {
        console.log('Generando opciones para:', correctCountry.name);
        
        // Obtener 3 países aleatorios (incorrectos)
        const incorrectCountries = this.countries
            .filter(country => country.name !== correctCountry.name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        // Combinar con la respuesta correcta y mezclar
        const allOptions = [correctCountry, ...incorrectCountries]
            .sort(() => Math.random() - 0.5);
        
        console.log('Opciones generadas:', allOptions.map(c => c.name));
        
        // Limpiar contenedor de opciones
        if (this.optionsContainer) {
            this.optionsContainer.innerHTML = '';
            
            // Crear botones de opciones
            allOptions.forEach(country => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = country.name;
                button.addEventListener('click', () => this.selectOption(button, country, correctCountry));
                this.optionsContainer.appendChild(button);
            });
        }
    }

    selectOption(button, selectedCountry, correctCountry) {
        if (this.selectedAnswer) return; // Ya se seleccionó una respuesta
        
        this.selectedAnswer = selectedCountry;
        console.log('Opción seleccionada:', selectedCountry.name, 'Correcta:', correctCountry.name);
        
        // Deshabilitar todos los botones y mostrar respuestas
        if (this.optionsContainer) {
            const allButtons = this.optionsContainer.querySelectorAll('.option');
            allButtons.forEach(btn => {
                btn.style.cursor = 'default';
                if (btn.textContent === correctCountry.name) {
                    btn.classList.add('correct');
                } else if (btn === button && btn.textContent !== correctCountry.name) {
                    btn.classList.add('incorrect');
                } else if (btn.textContent !== correctCountry.name) {
                    btn.style.opacity = '0.5';
                }
            });
        }
        
        // Actualizar puntuación
        if (selectedCountry.name === correctCountry.name) {
            this.score += 10;
            this.correctAnswers++;
            console.log('¡Respuesta correcta! Puntuación:', this.score);
        } else {
            console.log('Respuesta incorrecta.');
        }
        
        // Mostrar botón siguiente
        if (this.nextButton) this.nextButton.style.display = 'block';
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        console.log('Avanzando a pregunta:', this.currentQuestionIndex + 1);
        this.showQuestion();
    }

    endGame() {
        console.log('Juego terminado. Puntuación final:', this.score);
        
        if (this.questionContainer) this.questionContainer.style.display = 'none';
        if (this.finalScoreContainer) this.finalScoreContainer.style.display = 'block';
        
        // Mostrar puntuación final
        if (this.finalScoreText) this.finalScoreText.textContent = `${this.correctAnswers}/${this.totalQuestions}`;
        
        // Mensaje personalizado según la puntuación
        let message = '';
        const percentage = (this.correctAnswers / this.totalQuestions) * 100;
        
        if (percentage === 100) {
            message = '¡Perfecto! 🏆 ¡Eres un experto en geografía europea!';
        } else if (percentage >= 80) {
            message = '¡Excelente! 🌟 Conoces muy bien Europa.';
        } else if (percentage >= 60) {
            message = '¡Bien hecho! 👍 Tienes buenos conocimientos de geografía.';
        } else if (percentage >= 40) {
            message = 'No está mal 📚 Sigue practicando para mejorar.';
        } else {
            message = '¡Ánimo! 💪 La práctica hace al maestro.';
        }
        
        if (this.scoreMessage) this.scoreMessage.textContent = message;
        
        // Actualizar barra de progreso al 100%
        if (this.progressBar) this.progressBar.style.width = '100%';
    }

    restartGame() {
        console.log('Reiniciando juego...');
        this.startGame();
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando juego...');
    new EuropeGame();
});