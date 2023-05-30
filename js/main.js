const $newEntryImg = document.querySelector('#entry-img');
const $imgInput = document.querySelector('#img-url');
const $newEntryForm = document.querySelector('#new-entry-form');

$imgInput.addEventListener('input', event => {
  const imgPath = event.target.value;
  $newEntryImg.src = imgPath;
});

$newEntryForm.addEventListener('submit', event => {
  event.preventDefault();
  const newEntry = {};
  newEntry.title = $newEntryForm.elements.title.value;
  newEntry.photoURL = $newEntryForm.elements.img.value;
  newEntry.notes = $newEntryForm.elements.notes.value;
  newEntry.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $newEntryImg.src = 'images/placeholder-image-square.jpg';
  $newEntryForm.reset();
});

function renderEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');

  const $entryCol1 = document.createElement('div');
  $entryCol1.setAttribute('class', 'col-half');

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoURL);
  $entryImg.setAttribute('class', 'entry-img');
  $entryImg.setAttribute('alt', entry.title);

  const $entryCol2 = document.createElement('div');
  $entryCol2.setAttribute('class', 'col-half row');

  const $entryH2 = document.createElement('h2');
  $entryH2.textContent = entry.title;

  const $entryNote = document.createElement('p');
  $entryNote.textContent = entry.notes;

  $entryItem.appendChild($entryCol1);
  $entryItem.appendChild($entryCol2);
  $entryCol1.appendChild($entryImg);
  $entryCol2.appendChild($entryH2);
  $entryCol2.appendChild($entryNote);

  return $entryItem;
}

renderEntry(data.entries[0]);
