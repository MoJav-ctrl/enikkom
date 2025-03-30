document.addEventListener('DOMContentLoaded', function() {
    // Load projects from API
    async function loadProjects() {
      try {
        const response = await fetch('/projects');
        const projects = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
          projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card cursor-pointer" data-id="${project.id}">
              <div class="bg-gray-100 h-64 rounded-lg overflow-hidden">
                <img src="${project.images[0]}" alt="${project.title}" class="w-full h-full object-cover">
              </div>
              <h3 class="text-xl font-semibold mt-4 text-enikkom-bg">${project.title}</h3>
              <p class="text-gray-600 mt-2 line-clamp-2">${project.description}</p>
            </div>
          `).join('');
          
          // Add click event to project cards
          document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
              const projectId = this.getAttribute('data-id');
              openModal(projects.find(p => p.id == projectId));
            });
          });
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
    
    // Modal functionality
    let currentProject = null;
    let currentImageIndex = 0;
    
    function openModal(project) {
      currentProject = project;
      currentImageIndex = 0;
      
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-description').textContent = project.description;
      updateModalImage();
      updateThumbnails();
      
      document.getElementById('project-modal').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
    
    function closeModal() {
      document.getElementById('project-modal').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
    
    function updateModalImage() {
      if (currentProject) {
        document.getElementById('modal-image').src = currentProject.images[currentImageIndex];
      }
    }
    
    function updateThumbnails() {
      const thumbnailsContainer = document.getElementById('thumbnails');
      if (thumbnailsContainer && currentProject) {
        thumbnailsContainer.innerHTML = currentProject.images.map((image, index) => `
          <div class="cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-enikkom-btn' : ''}" data-index="${index}">
            <img src="${image}" alt="Thumbnail ${index + 1}" class="w-full h-24 object-cover rounded">
          </div>
        `).join('');
        
        // Add click event to thumbnails
        document.querySelectorAll('#thumbnails div').forEach(thumb => {
          thumb.addEventListener('click', function() {
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            updateModalImage();
            updateThumbnails();
          });
        });
      }
    }
    
    // Event listeners for modal controls
    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('prev-btn')?.addEventListener('click', function() {
      if (currentProject) {
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateModalImage();
        updateThumbnails();
      }
    });
    
    document.getElementById('next-btn')?.addEventListener('click', function() {
      if (currentProject) {
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateModalImage();
        updateThumbnails();
      }
    });
    
    // Close modal when clicking outside content
    document.getElementById('project-modal')?.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
    
    // Load projects when page loads
    if (window.location.pathname === '/projects') {
      loadProjects();
    }
  });
  