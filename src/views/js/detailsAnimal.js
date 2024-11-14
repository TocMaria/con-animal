const BASE_URL = 'http://localhost:3000';

function formatDateToInput(value) {
  return value.split('T')[0]; // Return an empty string if the date is invalid
}

async function loadAnimalDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    try {
      const response = await fetch(`${BASE_URL}/animals/${id}`);
      if (!response.ok) {
         console.error('Erro ao buscar dados do animal status:', response.status);
         return;
      }

      const animalData = await response.json();

      document.querySelector('.edit-btn').href = `editAnimal.html?id=${id}`;
      document.getElementById("animal-name").textContent = animalData.name || "N/A";
      document.getElementById("animal-species").textContent = animalData.species || "N/A";
      document.getElementById("animal-sex").textContent = animalData.sex || "N/A";
      document.getElementById("animal-age").textContent = animalData.age || "N/A";
      document.getElementById("animal-weight").textContent = animalData.weight || "N/A";
      document.getElementById("animal-size").textContent = animalData.size || "N/A";
      // document.getElementById("animal-rescue-location").textContent = animalData.rescue_location || "N/A";
      document.getElementById("animal-rescue-date").textContent = formatDateToInput(animalData.rescue_date) || "N/A";
      // document.getElementById("animal-last-location").textContent = animalData.last_location || "N/A";
      document.getElementById("animal-castrated").textContent = animalData.castrated ? "Sim" : "Não";
      document.getElementById("animal-chip-code").textContent = animalData.chip_code || "N/A";
      document.getElementById("animal-history").textContent = animalData.history || "N/A";
      // document.getElementById("profile-photo").src = animalData.profile_photo || '';

 
      const galleryContainer = document.getElementById("animal-gallery");

      const images = [
        animalData.profile_photo,   // Única imagem do profile_photo
        ...(animalData.gallery_public || []),  // Concatena as imagens de gallery_public
        ...(animalData.gallery_private || [])  // Concatena as imagens de gallery_private
      ].filter(image => image);

      // Limpa o contêiner antes de adicionar as imagens
      galleryContainer.innerHTML = "";

      // Adiciona cada imagem como um slide no Swiper
      images.forEach(imageSrc => {
        const slideDiv = document.createElement("div");
        slideDiv.className = "swiper-slide";

        const img = document.createElement("img");
        img.src = imageSrc; // Use o link direto da imagem
        img.alt = "Imagem do animal";
        img.className = "img-fluid"

        slideDiv.appendChild(img);
        galleryContainer.appendChild(slideDiv);
      });

      // Inicializa o Swiper após carregar as imagens
      const swiper = new Swiper(".swiper-container", {
        loop: true,
        speed: 400,
        spaceBetween: 100,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        }
      });

    } catch (error) {
      console.error('Erro ao carregar dados do animal:', error);
    }
  }
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", loadAnimalDetails);
