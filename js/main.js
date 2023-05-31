// New entry form elements
const $newEntryImg = document.querySelector('#entry-img');
const $imgInput = document.querySelector('#img-url');
const $newEntryForm = document.querySelector('#new-entry-form');
const $entryFormTitle = document.querySelector('#entry-form-title');
const $deleteEntry = document.querySelector('#delete-button');

// Entry list elements
const $entryList = document.querySelector('#entries-list');
const $noEntries = document.querySelector('#no-entries');

// View elements
const $formView = document.querySelector('[data-view="entry-form"]');
const $entriesView = document.querySelector('[data-view="entries"]');
const $entriesLink = document.querySelector('#entries-link');
const $formLink = document.querySelector('#form-link');

// Modal Elements
const $modalOverlay = document.querySelector('#overlay');

// Add image to placeholder from form
$imgInput.addEventListener('input', event => {
  const imgPath = event.target.value;
  $newEntryImg.src = imgPath;
});

// On submit, create a new object at the beginning of the data.entries array
// Or update current item if user is editing an entry
$newEntryForm.addEventListener('submit', event => {
  event.preventDefault();
  const newEntry = {};

  if (data.editing === null) {
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
  } else if (data.editing !== null) {

    newEntry.entryID = data.editing.entryID;
    newEntry.title = $newEntryForm.elements.title.value;
    newEntry.photoURL = $newEntryForm.elements.img.value;
    newEntry.notes = $newEntryForm.elements.notes.value;

    for (let i = 0; i < data.entries.length; i++) {
      if (newEntry.entryID === data.entries[i].entryID) {
        data.entries.splice(i, 1, newEntry);
      }
    }

    const $entryItems = $entryList.childNodes;
    for (let i = 0; i < $entryItems.length; i++) {
      if (parseInt($entryItems[i].getAttribute('data-entry-id')) === newEntry.entryID) {
        $entryItems[i].replaceWith(renderEntry(newEntry));
      }
    }

    data.editing = null;

    $deleteEntry.classList.add('hidden');
    $entryFormTitle.textContent = 'New Entry';
    $newEntryImg.src = 'images/placeholder-image-square.jpg';
    $newEntryForm.reset();
    viewSwap('entries');
  }

  // Hide no entries text
  if ($entryList.firstChild) {
    toggleNoEntries($formView);
  }
});

// Render a dom tree for entries
function renderEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');
  $entryItem.setAttribute('data-entry-id', entry.entryID);

  const $entryCol1 = document.createElement('div');
  $entryCol1.setAttribute('class', 'entry-col');

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoURL);
  $entryImg.setAttribute('class', 'entry-img');
  $entryImg.setAttribute('alt', entry.title);

  const $entryCol2 = document.createElement('div');
  $entryCol2.setAttribute('class', 'entry-col');

  const $entryHeadlineWrap = document.createElement('div');
  $entryHeadlineWrap.setAttribute('class', 'flex space-between');

  const $entryH2 = document.createElement('h2');
  $entryH2.textContent = entry.title;

  const $entryPencil = document.createElement('i');
  $entryPencil.setAttribute('class', 'fa-solid fa-pencil');

  const $entryNote = document.createElement('p');
  $entryNote.textContent = entry.notes;

  $entryItem.appendChild($entryCol1);
  $entryItem.appendChild($entryCol2);
  $entryCol1.appendChild($entryImg);
  $entryCol2.appendChild($entryHeadlineWrap);
  $entryHeadlineWrap.appendChild($entryH2);
  $entryHeadlineWrap.appendChild($entryPencil);
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
    $deleteEntry.classList.add('hidden');
    data.editing = null;

  } else if (view === 'entry-form') {
    $entriesView.classList.add('hidden');
    $formView.classList.remove('hidden');
    $deleteEntry.classList.add('hidden');
    data.editing = null;
  }
}

// Show entries when nav item is clicked
$entriesLink.addEventListener('click', event => {
  viewSwap('entries');
});

// Show form when new button is clicked
$formLink.addEventListener('click', event => {
  viewSwap('entry-form');
  $newEntryForm.reset();
});

// Edit entry on click of pencil icon
$entryList.addEventListener('click', event => {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');

    for (const entry in data.entries) {
      const targetEntryId = event.target.closest('[data-entry-id]').getAttribute('data-entry-id');
      if (data.entries[entry].entryID === parseInt(targetEntryId)) {
        data.editing = data.entries[entry];
      }
    }
    $newEntryForm.elements.title.value = data.editing.title;
    $newEntryForm.elements.img.value = data.editing.photoURL;
    $newEntryForm.elements.notes.value = data.editing.notes;
    $entryFormTitle.textContent = 'Edit Entry';
    $deleteEntry.classList.remove('hidden');
  }
});

$deleteEntry.addEventListener('click', event => {
  $modalOverlay.classList.remove('hidden');
});
