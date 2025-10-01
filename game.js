class EuropeGame {
    constructor() {
        this.countries = [
            {
                name: "España",
                flag: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Francia",
                flag: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Italia",
                flag: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Alemania",
                flag: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Reino Unido",
                flag: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Portugal",
                flag: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Países Bajos",
                flag: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Bélgica",
                flag: "https://images.unsplash.com/photo-1559113409-c3092ca9e2f4?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Suiza",
                flag: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Austria",
                flag: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Suecia",
                flag: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Noruega",
                flag: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Dinamarca",
                flag: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Finlandia",
                flag: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Polonia",
                flag: "https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "República Checa",
                flag: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Hungría",
                flag: "https://images.unsplash.com/photo-1565969308534-0999769c8e69?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Grecia",
                flag: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Croacia",
                flag: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Rumania",
                flag: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Bulgaria",
                flag: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Eslovenia",
                flag: "https://images.unsplash.com/photo-1564758564527-b97d79ba8c9b?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Eslovaquia",
                flag: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Estonia",
                flag: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Letonia",
                flag: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Lituania",
                flag: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Irlanda",
                flag: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Islandia",
                flag: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Luxemburgo",
                flag: "https://images.unsplash.com/photo-1559113409-c3092ca9e2f4?w=300&h=200&fit=crop&q=80"
            },
            {
                name: "Malta",
                flag: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&q=80"
            }
        ];
        
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
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextQuestion());
        }
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => this.restartGame());
        }
    }

    startGame() {
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
            this.flagImage.style.display = 'block';
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