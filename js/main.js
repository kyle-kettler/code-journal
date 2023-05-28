const $entryImg = document.querySelector('#entry-img');
const $imgInput = document.querySelector('#img-url');
const $newEntryForm = document.querySelector('#new-entry-form');

$imgInput.addEventListener('input', event => {
  const imgPath = event.target.value;
  $entryImg.src = imgPath;
});

$newEntryForm.addEventListener('submit', event => {
  event.preventDefault();
  const newEntry = {};
  newEntry.title = $newEntryForm.elements.title.value;
  newEntry.photoURL = $newEntryForm.elements.img.value;
  newEntry.notes = $newEntryForm.elements.notes.value;
  newEntry.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(newEntry);
  $entryImg.src = 'images/placeholder-image-square.jpg';
  $newEntryForm.reset();
});
