const $entryImg = document.querySelector('#entry-img');
const $imgInput = document.querySelector('#img-url');

$imgInput.addEventListener('input', event => {
  const imgPath = event.target.value;
  $entryImg.src = imgPath;
});
