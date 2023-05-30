// New nntry form elements
const $newEntryImg = document.querySelector('#entry-img');
const $imgInput = document.querySelector('#img-url');
const $newEntryForm = document.querySelector('#new-entry-form');

// Entry list elements
const $entryList = document.querySelector('#entries-list');
const $noEntries = document.querySelector('#no-entries');

// View elements
const $formView = document.querySelector('[data-view="entry-form"]');
const $entriesView = document.querySelector('[data-view="entries"]');
const $entriesLink = document.querySelector('#entries-link');
const $formLink = document.querySelector('#form-link');

// Add image to placeholder from form
$imgInput.addEventListener('input', event => {
  const imgPath = event.target.value;
  $newEntryImg.src = imgPath;
});

// On submit, create a new object at the beginning of the data.entries array
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

  // Create dom tree and add new entry to the page
  $entryList.prepend(renderEntry(newEntry));
  viewSwap('entries');

  // Hide no entries text
  if ($entryList.firstChild) {
    toggleNoEntries($formView);
  }
});

// Render a dom tree for entries
function renderEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');

  const $entryCol1 = document.createElement('div');
  $entryCol1.setAttribute('class', 'entry-col');

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoURL);
  $entryImg.setAttribute('class', 'entry-img');
  $entryImg.setAttribute('alt', entry.title);

  const $entryCol2 = document.createElement('div');
  $entryCol2.setAttribute('class', 'entry-col');

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

// Determine what content to show on the page at load
document.addEventListener('DOMContentLoaded', event => {
  for (const entry in data.entries) {
    $entryList.appendChild(renderEntry(data.entries[entry]));
  }

  viewSwap(data.view);

  if ($entryList.firstChild) {
    toggleNoEntries($formView);
  }
});

// Toggle visibility of the no entries text
function toggleNoEntries() {
  if (!$noEntries.classList.contains('hidden')) { $noEntries.classList.add('hidden'); }
}

// Swap the view between entries and form
function viewSwap(view) {
  data.view = view;

  if (view === 'entries') {
    $formView.classList.add('hidden');
    $entriesView.classList.remove('hidden');

  } else if (view === 'entry-form') {
    $entriesView.classList.add('hidden');
    $formView.classList.remove('hidden');
  }
}

// Show entries when nav item is clicked
$entriesLink.addEventListener('click', event => {
  viewSwap('entries');
});

// Show form when new button is clicked
$formLink.addEventListener('click', event => {
  viewSwap('entry-form');
});
