
function scrollToCarousel() {
    const carousel = document.querySelector('.carousel-container');
    carousel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const folderData = {
  project1: {
    title: "Brew House Identity",
    images: [
      "images/coffee.png",
      "images/menu1.png",
      "images/menu2.png",
      "images/case.png"
    ]
  },
  project2: {
    title: "Zine Tales",
    images: [
      "images/1.jpg",
      "images/2.jpg",
      "images/3.jpg",
      "images/4.jpg",
      "images/5.jpg",
      "images/6.jpg",
      "images/7.jpg",
      "images/8.jpg"
      
    ]
  },
  project3: {
    title: "Speaker Spotlight",
    images: [
      "images/speaker-talk.png",
      "images/speaker-talk2.png",
      "images/speaker-talk3.png"      
    ]
  }
};

function openFolderOverlay(projectKey) {
  const overlay = document.getElementById('folderOverlay');
  const folderTitle = document.getElementById('folderTitle');
  const folderImages = document.getElementById('folderImages');

  // Clear previous images
  folderImages.innerHTML = '';

  const data = folderData[projectKey];
  folderTitle.textContent = data.title;

  data.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'w-full aspect-square object-cover rounded-lg cursor-pointer hover:scale-105 transition-all duration-300';
    img.onclick = () => openImagePreview(src);
    folderImages.appendChild(img);
  });

  overlay.classList.remove('hidden');
}

function closeFolderOverlay() {
  document.getElementById('folderOverlay').classList.add('hidden');
}

// Overlay
function openImagePreview(src) {
  const previewOverlay = document.createElement('div');
  previewOverlay.className = 'fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4';
  previewOverlay.innerHTML = `<img src="${src}" class="max-h-full max-w-full rounded-lg shadow-lg"><button class="absolute top-4 right-4 text-white text-2xl font-bold">✖</button>`;
  document.body.appendChild(previewOverlay);

  previewOverlay.querySelector('button').onclick = () => {
    previewOverlay.remove();
  };
}

function openOverlay(imageSrc) {
  const overlay = document.getElementById('imageOverlay');
  const overlayImage = document.getElementById('overlayImage');
  const imageInfo = document.getElementById('imageInfo');
  
  overlayImage.src = imageSrc;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Show image path info
  imageInfo.textContent = `PATH: ${imageSrc}`;
  
  // Handle image load to adjust sizing
  overlayImage.onload = function() {
    const naturalWidth = this.naturalWidth;
    const naturalHeight = this.naturalHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate optimal size while maintaining aspect ratio
    const maxWidth = viewportWidth * 0.9;
    const maxHeight = viewportHeight * 0.8;
    
    let displayWidth = naturalWidth;
    let displayHeight = naturalHeight;
    
    // Scale down if image is larger than viewport
    if (displayWidth > maxWidth || displayHeight > maxHeight) {
      const widthRatio = maxWidth / displayWidth;
      const heightRatio = maxHeight / displayHeight;
      const minRatio = Math.min(widthRatio, heightRatio);
      
      displayWidth *= minRatio;
      displayHeight *= minRatio;
    }
    
    this.style.width = displayWidth + 'px';
    this.style.height = displayHeight + 'px';
  };
  
  // Handle image error (for placeholder images)
  overlayImage.onerror = function() {
    this.style.width = '600px';
    this.style.height = '400px';
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMGQwNzE0Ii8+CjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSI1OTYiIGhlaWdodD0iMzk2IiBzdHJva2U9IiMwMGZmMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiLz4KPHRLEHU+CiAgPHRzcGFuIHg9IjMwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBmZjAwIiBmb250LWZhbWlseT0iUHJlc3MgU3RhcnQgMlAiIGZvbnQtc2l6ZT0iMjQiPvCfkq4gSU1BR0UgUExBQ0VIT0xERVI8L3RzcGFuPgogIDx0c3BhbiB4PSIzMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwZmYwMCIgZm9udC1mYW1pbHk9IlByZXNzIFN0YXJ0IDJQIiBmb250LXNpemU9IjEyIj5BZGQgeW91ciBpbWFnZSB0bzwvdHNwYW4+CiAgPHRzcGFuIHg9IjMwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBmZjAwIiBmb250LWZhbWlseT0iUHJlc3MgU3RhcnQgMlAiIGZvbnQtc2l6ZT0iMTIiPmltYWdlcy8gZm9sZGVyPC90c3Bhbj4KICA8L3RleHQ+Cjwvc3ZnPgo=';
    imageInfo.textContent = `PLACEHOLDER: ${imageSrc} (Add your image to the images/ folder)`;
  };
}

function closeOverlay() {
  const overlay = document.getElementById('imageOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close overlay with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeOverlay();
  }
});

// Add some dynamic particle effects
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 2 + 's';
  particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
  document.querySelector('.particles').appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 7000);
}

// Create particles periodically
setInterval(createParticle, 800);

// Add some retro sound effects (visual feedback)
document.querySelectorAll('.pixel-border-hover').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transform += ' scale(1.02)';
  });
  
  element.addEventListener('mouseleave', function() {
    this.style.transform = this.style.transform.replace(' scale(1.02)', '');
  });
});

// Glitch effect enhancement
document.querySelector('.glitch').addEventListener('mouseenter', function() {
  this.style.animation = 'glitch 0.1s infinite, glitch-text 0.15s infinite';
});

document.querySelector('.glitch').addEventListener('mouseleave', function() {
  this.style.animation = 'glitch 0.3s infinite, glitch-text 0.5s infinite';
});

// Add typing effect to certain texts
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize some retro effects on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add some random glitch effects to cards
  setInterval(() => {
    const cards = document.querySelectorAll('.pixel-border');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    if (randomCard) {
      randomCard.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => {
        randomCard.style.filter = '';
      }, 200);
    }
  }, 5000);
});