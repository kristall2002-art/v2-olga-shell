(function () {
  'use strict';

  /* Мобильное меню */
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Лайтбокс галереи */
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.gallery-item button'));
  var lightbox = document.querySelector('.lightbox');
  if (!triggers.length || !lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var lightboxCaption = lightbox.querySelector('.lightbox-caption');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var currentIndex = 0;
  var lastFocused = null;

  function show(index) {
    currentIndex = (index + triggers.length) % triggers.length;
    var btn = triggers[currentIndex];
    var fullSrc = btn.getAttribute('data-full') || btn.querySelector('img') && btn.querySelector('img').src;
    var img = btn.closest('.gallery-item').querySelector('img');
    lightboxImg.src = fullSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = img.alt || '';
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { show(currentIndex + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(currentIndex + 1);
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
  });
})();
