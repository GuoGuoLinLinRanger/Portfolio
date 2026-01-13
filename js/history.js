<<<<<<< HEAD
// history.js - Additional JavaScript for history page
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Clear any saved job data on page load
  localStorage.removeItem('customJob');
  
  // Job editing functionality
  const editableJob = document.getElementById('editableJob');
  const jobEditModal = document.getElementById('jobEditModal');
  const jobEditClose = document.getElementById('jobEditClose');
  const jobEditCancel = document.getElementById('jobEditCancel');
  const jobEditSave = document.getElementById('jobEditSave');
  
  // Form elements
  const jobTitleInput = document.getElementById('jobTitle');
  const jobDateInput = document.getElementById('jobDate');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const jobTagInput = document.getElementById('jobTag');
  
  // Reset editable job to default values
  function resetEditableJob() {
    if (editableJob) {
      const details = editableJob.querySelector('.details');
      details.querySelector('h3').textContent = "Your Company";
      editableJob.querySelector('.year').textContent = "Future";
      details.querySelector('p').textContent = "Click to edit this entry with your job details";
      details.querySelector('.tag').textContent = "Click to edit";
    }
  }
  
  // Clear input fields
  function clearInputFields() {
    jobTitleInput.value = "";
    jobDateInput.value = "";
    jobDescriptionInput.value = "";
    jobTagInput.value = "";
    
    // Set placeholders
    jobTitleInput.placeholder = "e.g., Senior Developer, TechCorp";
    jobDateInput.placeholder = "e.g., 2022 — 2023";
    jobDescriptionInput.placeholder = "Describe your responsibilities and achievements...";
    jobTagInput.placeholder = "e.g., Development, Leadership";
  }
  
  // Call reset on page load
  resetEditableJob();
  
  // Open job edit modal when editable job is clicked
  if (editableJob && jobEditModal) {
    editableJob.addEventListener('click', (e) => {
      // Don't trigger if clicking on a link inside the milestone
      if (e.target.tagName === 'A') return;
      
      // Clear input fields instead of pre-filling
      clearInputFields();
      
      // Show modal
      jobEditModal.setAttribute('aria-hidden', 'false');
      jobEditModal.style.display = 'grid';
    });
  }
  
  // Close modal functions
  function closeJobEditModal() {
    if (jobEditModal) {
      jobEditModal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        jobEditModal.style.display = 'none';
      }, 180);
    }
  }
  
  // Set up close event handlers
  if (jobEditClose) {
    jobEditClose.addEventListener('click', closeJobEditModal);
  }
  
  if (jobEditCancel) {
    jobEditCancel.addEventListener('click', closeJobEditModal);
  }
  
  // Close modal when clicking outside
  if (jobEditModal) {
    jobEditModal.addEventListener('click', (e) => {
      if (e.target === jobEditModal) {
        closeJobEditModal();
      }
    });
  }
  
  // Save job edits
  if (jobEditSave) {
    jobEditSave.addEventListener('click', () => {
      const details = editableJob.querySelector('.details');
      
      // Update the job entry with form values
      details.querySelector('h3').textContent = jobTitleInput.value || "Your Company";
      editableJob.querySelector('.year').textContent = jobDateInput.value || "Future";
      details.querySelector('p').textContent = jobDescriptionInput.value || "Click to edit this entry with your job details";
      details.querySelector('.tag').textContent = jobTagInput.value || "Click to edit";
      
      // Close modal
      closeJobEditModal();
    });
  }
  
  // History modal functionality (existing code)
  const modal = document.getElementById('historyModal');
  if (!modal) return;
  
  const titleEl = modal.querySelector('#histTitle');
  const detailsEl = modal.querySelector('#histDetails');
  const moreEl = modal.querySelector('#histMore');
  const closeBtn = modal.querySelector('#histClose');

  document.querySelectorAll('.milestone:not(.editable)').forEach(item => {
    item.addEventListener('click', () => {
      const t = item.dataset.title || item.querySelector('h3')?.textContent;
      const d = item.dataset.details || '';
      const m = item.dataset.more || '';
      titleEl.textContent = t;
      detailsEl.textContent = d;
      moreEl.textContent = m;
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'grid';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => modal.style.display = 'none', 180);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => modal.style.display = 'none', 180);
    }
  });
=======
// history.js - Additional JavaScript for history page
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Clear any saved job data on page load
  localStorage.removeItem('customJob');
  
  // Job editing functionality
  const editableJob = document.getElementById('editableJob');
  const jobEditModal = document.getElementById('jobEditModal');
  const jobEditClose = document.getElementById('jobEditClose');
  const jobEditCancel = document.getElementById('jobEditCancel');
  const jobEditSave = document.getElementById('jobEditSave');
  
  // Form elements
  const jobTitleInput = document.getElementById('jobTitle');
  const jobDateInput = document.getElementById('jobDate');
  const jobDescriptionInput = document.getElementById('jobDescription');
  const jobTagInput = document.getElementById('jobTag');
  
  // Reset editable job to default values
  function resetEditableJob() {
    if (editableJob) {
      const details = editableJob.querySelector('.details');
      details.querySelector('h3').textContent = "Your Company";
      editableJob.querySelector('.year').textContent = "Future";
      details.querySelector('p').textContent = "Click to edit this entry with your job details";
      details.querySelector('.tag').textContent = "Click to edit";
    }
  }
  
  // Clear input fields
  function clearInputFields() {
    jobTitleInput.value = "";
    jobDateInput.value = "";
    jobDescriptionInput.value = "";
    jobTagInput.value = "";
    
    // Set placeholders
    jobTitleInput.placeholder = "e.g., Senior Developer, TechCorp";
    jobDateInput.placeholder = "e.g., 2022 — 2023";
    jobDescriptionInput.placeholder = "Describe your responsibilities and achievements...";
    jobTagInput.placeholder = "e.g., Development, Leadership";
  }
  
  // Call reset on page load
  resetEditableJob();
  
  // Open job edit modal when editable job is clicked
  if (editableJob && jobEditModal) {
    editableJob.addEventListener('click', (e) => {
      // Don't trigger if clicking on a link inside the milestone
      if (e.target.tagName === 'A') return;
      
      // Clear input fields instead of pre-filling
      clearInputFields();
      
      // Show modal
      jobEditModal.setAttribute('aria-hidden', 'false');
      jobEditModal.style.display = 'grid';
    });
  }
  
  // Close modal functions
  function closeJobEditModal() {
    if (jobEditModal) {
      jobEditModal.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        jobEditModal.style.display = 'none';
      }, 180);
    }
  }
  
  // Set up close event handlers
  if (jobEditClose) {
    jobEditClose.addEventListener('click', closeJobEditModal);
  }
  
  if (jobEditCancel) {
    jobEditCancel.addEventListener('click', closeJobEditModal);
  }
  
  // Close modal when clicking outside
  if (jobEditModal) {
    jobEditModal.addEventListener('click', (e) => {
      if (e.target === jobEditModal) {
        closeJobEditModal();
      }
    });
  }
  
  // Save job edits
  if (jobEditSave) {
    jobEditSave.addEventListener('click', () => {
      const details = editableJob.querySelector('.details');
      
      // Update the job entry with form values
      details.querySelector('h3').textContent = jobTitleInput.value || "Your Company";
      editableJob.querySelector('.year').textContent = jobDateInput.value || "Future";
      details.querySelector('p').textContent = jobDescriptionInput.value || "Click to edit this entry with your job details";
      details.querySelector('.tag').textContent = jobTagInput.value || "Click to edit";
      
      // Close modal
      closeJobEditModal();
    });
  }
  
  // History modal functionality (existing code)
  const modal = document.getElementById('historyModal');
  if (!modal) return;
  
  const titleEl = modal.querySelector('#histTitle');
  const detailsEl = modal.querySelector('#histDetails');
  const moreEl = modal.querySelector('#histMore');
  const closeBtn = modal.querySelector('#histClose');

  document.querySelectorAll('.milestone:not(.editable)').forEach(item => {
    item.addEventListener('click', () => {
      const t = item.dataset.title || item.querySelector('h3')?.textContent;
      const d = item.dataset.details || '';
      const m = item.dataset.more || '';
      titleEl.textContent = t;
      detailsEl.textContent = d;
      moreEl.textContent = m;
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'grid';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => modal.style.display = 'none', 180);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(() => modal.style.display = 'none', 180);
    }
  });
>>>>>>> 1fe183fe96366765ea937364414299a07b9aa318
});