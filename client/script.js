let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}

function toggleMobileMenu() {
  document.getElementById("menu").classList.toggle("display-menu");
}

$('#products1').change(function () {
  var value = $(this).val();
  if (value === 'clearppf') {
      window.location.href = 'clearppf.html';
  } else if (value === 'matteppf') {
      window.location.href = 'matteppf.html';
  }
  else if (value === 'precutppf') {
      window.location.href = 'precut.html';
  }
  else if (value === 'interiorppf') {
      window.location.href = 'interior.html';
  }

});
