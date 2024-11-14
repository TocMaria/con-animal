const BASE_URL = 'http://localhost:3000';

function formatDateToInput(value) {
  return value.split('T')[0]; // Return an empty string if the date is invalid
}

// Carregar dados do animal para edição
async function loadAnimalData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    try {
      const response = await fetch(`${BASE_URL}/animals/${id}`);
      if (!response.ok) {
         console.error('Erro ao buscar dados do animal status: {0} \n url: {1}', response.status, `${BASE_URL}/animals/${id}`);
      }

      const animalData = await response.json();

      document.getElementById("name").value = animalData.name || "";
      document.getElementById("species").value = animalData.species || "";
      document.querySelector(`input[name="sex"][value="${animalData.sex}"]`).checked = true;
      document.getElementById("age").value = animalData.age || "";
      document.getElementById("weight").value = animalData.weight || "";
      document.getElementById("size").value = animalData.size || "";
      document.getElementById("rescue_location").value = animalData.rescue_location || "";
      document.getElementById("rescue_date").value = formatDateToInput(animalData.rescue_date);
      document.getElementById("rescue_location").value = animalData.rescue_location || "";
      document.getElementById("profile_photo_pc").src = animalData.profile_photo || "";
      document.getElementById("profile_photo").setAttribute("data-src", animalData.profile_photo || "");
      document.getElementById("gallery_public").setAttribute("data-src", animalData.gallery_public || "");
      document.getElementById("gallery_private").setAttribute("data-src", animalData.gallery_private || "");


      document.getElementById("status").value = animalData.status || "";
      document.getElementById("last_location").value = animalData.last_location || "";
      document.querySelector(`input[name="castrated"][value="${animalData.castrated ? "true" : "false"}"]`).checked = true;
      document.getElementById("chip_code").value = animalData.chip_code || "";
      document.getElementById("history").value = animalData.history || "";


      // Preenchendo o campo de Ficha Veterinária
      if (animalData.veterinary_records && animalData.veterinary_records.length > 0) {
        const vetRecordsContainer = document.getElementById("veterinary-records");
  vetRecordsContainer.innerHTML = ""; // Limpa o container antes de adicionar novos registros

    // Loop para preencher os registros de ficha veterinária
    animalData.veterinary_records.forEach((record, index) => {
      const recordDiv = document.createElement("div");
      recordDiv.classList.add("veterinary-records");
      record.date = record.date ? formatDateToInput(record.date) : null;

      console.log("veterinary_records${index}[type]");

      recordDiv.innerHTML = `
          <h3>Ficha Veterinária ${index + 1}</h3>
          <div id="veterinary-records">
            <div class="form-group row">
              <label for="vet_type" class="col-md-3 col-form-label">Tipo (Vermífugo/Vacina):</label>
              <div class="col-md-3">
                <input type="text" id="vet_type" name="veterinary_records${index}[type]" class="form-control" value=${record.type}>
              </div>
            <!-- </div>
          
            <div class="form-group row"> -->
              <label for="vet_date" class="col-md-3 col-form-label">Data:</label>
              <div class="col-md-3">
                <input type="date" id="vet_date" name="veterinary_records${index}[date]" class="form-control" value=${record.date}>
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_veterinarian" class="col-md-3 col-form-label">Veterinário Responsável:</label>
              <div class="col-md-9">
                <input type="text" id="vet_veterinarian" name="veterinary_records${index}[veterinarian]" class="form-control" value=${record.veterinarian}>
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_allergies" class="col-md-3 col-form-label">Alergias:</label>
              <div class="col-md-9">
                <input type="text" id="vet_allergies" name="veterinary_records${index}[allergies]" class="form-control" value=${JSON.stringify(record.allergies)}>
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_comorbidities" class="col-md-3 col-form-label">Comorbidades:</label>
              <div class="col-md-9">
                <input type="text" id="vet_comorbidities" name="veterinary_records${index}[comorbidities]" class="form-control" value=${JSON.stringify(record.comorbidities)}>
              </div>
            </div>
          </div>
      `;

      // Adiciona o registro de ficha veterinária ao container
      vetRecordsContainer.appendChild(recordDiv);
    });
      }
    } catch (error) {
      console.error('Erro ao carregar dados do animal:', error);
    }
  }
}

// Atualizar animal
async function updateAnimal(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const formData = new FormData(document.getElementById('edit-animal-form'));

  try {
    const response = await fetch(`${BASE_URL}/animals/editar/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (response.ok) {
      const animal = await response.json();
      console.log('Registro Editado:', animal.name);
      window.location.href = 'index.html';
    } else {
      console.error('Erro ao registrar animal');
    }
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadAnimalData);
document.getElementById('edit-animal-form').addEventListener('submit', updateAnimal);
