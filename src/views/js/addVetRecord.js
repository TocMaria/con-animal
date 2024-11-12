let recordIndex = 1;

    function addVeterinaryRecord() {
      const recordsContainer = document.getElementById('veterinary-records');
      
      // Criação de novos campos para outro registro veterinário
      const recordHTML = `
      </br>
      <hr>
            <div class="form-group row">
              <label for="vet_type" class="col-md-3 col-form-label">Tipo (Vermífugo/Vacina):</label>
              <div class="col-md-3">
                <input type="text" id="vet_type" name="veterinary_records${recordIndex}[type]" class="form-control">
              </div>
            <!-- </div>
          
            <div class="form-group row"> -->
              <label for="vet_date" class="col-md-3 col-form-label">Data:</label>
              <div class="col-md-3">
                <input type="date" id="vet_date" name="veterinary_records${recordIndex}[date]" class="form-control">
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_veterinarian" class="col-md-3 col-form-label">Veterinário Responsável:</label>
              <div class="col-md-9">
                <input type="text" id="vet_veterinarian" name="veterinary_records${recordIndex}[veterinarian]" class="form-control">
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_allergies" class="col-md-3 col-form-label">Alergias:</label>
              <div class="col-md-9">
                <input type="text" id="vet_allergies" name="veterinary_records${recordIndex}[allergies]" class="form-control">
              </div>
            </div>
          
            <div class="form-group row">
              <label for="vet_comorbidities" class="col-md-3 col-form-label">Comorbidades:</label>
              <div class="col-md-9">
                <input type="text" id="vet_comorbidities" name="veterinary_records${recordIndex}[comorbidities]" class="form-control">
              </div>
            </div>
      `;

      const newRecord = document.createElement('div');
      newRecord.innerHTML = recordHTML;
      recordsContainer.appendChild(newRecord);
      
      recordIndex++;
    }