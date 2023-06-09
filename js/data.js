/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

const previousEntriesJSON = localStorage.getItem('data');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
