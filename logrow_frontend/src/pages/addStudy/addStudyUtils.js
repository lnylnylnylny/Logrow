export function handleDateValidation(startDateInput, endDateInput) {
    startDateInput.addEventListener("change", () => {
      const start = new Date(startDateInput.value);
      endDateInput.min = startDateInput.value;
  
      const end = new Date(endDateInput.value);
      if (end < start) {
        endDateInput.value = startDateInput.value;
      }
    });
  
    endDateInput.addEventListener("change", () => {
      const start = new Date(startDateInput.value);
      const end = new Date(endDateInput.value);
      if (end < start) {
        endDateInput.value = startDateInput.value;
      }
    });
  }
  