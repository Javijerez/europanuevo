class EuropeGame {
    constructor() {
        this.countries = countriesData;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 10;
        this.gameQuestions = [];
        this.selectedAnswer = null;
        
        this.initializeElements();
        this.startGame();
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
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    startGame() {
        console.log('Iniciando juego...', this.countries.length, 'países disponibles');
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.gameQuestions = this.generateGameQuestions();
        
        this.questionContainer.style.display = 'block';
        this.finalScoreContainer.style.display = 'none';
        
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
        this.flagImage.src = currentQuestion.flag;
        this.flagImage.alt = `Bandera de ${currentQuestion.name}`;
        
        // Actualizar stats
        this.questionNumberEl.textContent = this.currentQuestionIndex + 1;
        this.scoreEl.textContent = this.score;
        this.correctEl.textContent = this.correctAnswers;
        
        // Actualizar barra de progreso
        const progress = ((this.currentQuestionIndex) / this.totalQuestions) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Generar opciones
        this.generateOptions(currentQuestion);
        
        // Ocultar botón siguiente
        this.nextButton.style.display = 'none';
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

    selectOption(button, selectedCountry, correctCountry) {
        if (this.selectedAnswer) return; // Ya se seleccionó una respuesta
        
        this.selectedAnswer = selectedCountry;
        console.log('Opción seleccionada:', selectedCountry.name, 'Correcta:', correctCountry.name);
        
        // Deshabilitar todos los botones y mostrar respuestas
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
        
        // Actualizar puntuación
        if (selectedCountry.name === correctCountry.name) {
            this.score += 10;
            this.correctAnswers++;
            console.log('¡Respuesta correcta! Puntuación:', this.score);
        } else {
            console.log('Respuesta incorrecta.');
        }
        
        // Mostrar botón siguiente
        this.nextButton.style.display = 'block';
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        console.log('Avanzando a pregunta:', this.currentQuestionIndex + 1);
        this.showQuestion();
    }

    endGame() {
        console.log('Juego terminado. Puntuación final:', this.score);
        
        this.questionContainer.style.display = 'none';
        this.finalScoreContainer.style.display = 'block';
        
        // Mostrar puntuación final
        this.finalScoreText.textContent = `${this.correctAnswers}/${this.totalQuestions}`;
        
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
        
        this.scoreMessage.textContent = message;
        
        // Actualizar barra de progreso al 100%
        this.progressBar.style.width = '100%';
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