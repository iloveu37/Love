document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const landingPage = document.querySelector('.landing-page');
  const memoryPage = document.querySelector('.memory-page');
  const galleryPage = document.querySelector('.gallery-page');
  const proposalPage = document.querySelector('.proposal-page');
  const yesPage = document.querySelector('.yes-page');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const continueBtn = document.querySelector('.continue-btn');
  const yesBtn = document.querySelector('.yes-btn');
  const noBtn = document.querySelector('.no-btn');
  const musicToggle = document.getElementById('music-toggle');
  const backgroundMusic = document.getElementById('background-music');
  
  // State
  let currentPage = 0;
  const pages = [landingPage, memoryPage, galleryPage, proposalPage, yesPage];
  let heartsInterval;
  let confettiInterval;
  
  // Initialize
  createHearts();
  
  // Event Listeners
  landingPage.addEventListener('click', () => navigateTo(1));
  nextBtn.addEventListener('click', () => navigateTo(2));
  prevBtn.addEventListener('click', () => navigateTo(0));
  continueBtn.addEventListener('click', () => navigateTo(3));
  yesBtn.addEventListener('click', () => {
      navigateTo(4);
      startConfetti();
      startCountdown();
  });
  
  noBtn.addEventListener('click', function() {
      // Move button when hovered to make it fun
      const x = Math.floor(Math.random() * (window.innerWidth - this.offsetWidth));
      const y = Math.floor(Math.random() * (window.innerHeight - this.offsetHeight));
      this.style.position = 'absolute';
      this.style.left = x + 'px';
      this.style.top = y + 'px';
  });
  
  musicToggle.addEventListener('click', toggleMusic);
  
  // Functions
  function navigateTo(pageIndex) {
      pages[currentPage].classList.add('hidden');
      pages[pageIndex].classList.remove('hidden');
      currentPage = pageIndex;
      
      if (pageIndex === 4) {
          backgroundMusic.pause();
      }
  }
  
  function createHearts() {
      heartsInterval = setInterval(() => {
          const heart = document.createElement('div');
          heart.classList.add('heart');
          
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.top = Math.random() * 100 + 'vh';
          heart.style.opacity = Math.random();
          heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
          
          document.querySelector('.hearts').appendChild(heart);
          
          // Remove hearts after animation
          setTimeout(() => {
              heart.remove();
          }, 5000);
      }, 300);
  }
  
  function startConfetti() {
      confettiInterval = setInterval(() => {
          const confetti = document.createElement('div');
          confetti.classList.add('confetti-piece');
          
          // Random properties
          const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
          const shapes = ['circle', 'square', 'triangle'];
          
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.opacity = Math.random();
          confetti.style.width = (Math.random() * 10 + 5) + 'px';
          confetti.style.height = (Math.random() * 10 + 5) + 'px';
          confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
          
          if (Math.random() > 0.7) {
              confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
          }
          
          document.querySelector('.confetti').appendChild(confetti);
          
          // Animation
          const animationDuration = Math.random() * 3 + 2;
          confetti.style.animation = `fall ${animationDuration}s linear forwards`;
          
          // Create keyframes for falling animation
          const keyframes = `
              @keyframes fall {
                  to {
                      transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                      opacity: 0;
                  }
              }
          `;
          
          // Add style if not already present
          if (!document.getElementById('confetti-animation')) {
              const style = document.createElement('style');
              style.id = 'confetti-animation';
              style.innerHTML = keyframes;
              document.head.appendChild(style);
          }
          
          // Remove confetti after animation
          setTimeout(() => {
              confetti.remove();
          }, animationDuration * 1000);
      }, 100);
  }
  
  function startCountdown() {
      // Set your target date (e.g., 7 days from now)
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      
      function updateCountdown() {
          const now = new Date();
          const diff = targetDate - now;
          
          if (diff <= 0) {
              clearInterval(countdownInterval);
              document.querySelector('.countdown-timer').innerHTML = "Our adventure has begun!";
              return;
          }
          
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          document.getElementById('days').textContent = days.toString().padStart(2, '0');
          document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
          document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
          document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      }
      
      updateCountdown();
      const countdownInterval = setInterval(updateCountdown, 1000);
  }
  
  function toggleMusic() {
      if (backgroundMusic.paused) {
          backgroundMusic.play();
          musicToggle.textContent = '🔊';
      } else {
          backgroundMusic.pause();
          musicToggle.textContent = '🔇';
      }
  }
  
  // Clean up intervals when leaving the page
  window.addEventListener('beforeunload', function() {
      clearInterval(heartsInterval);
      clearInterval(confettiInterval);
  });
});