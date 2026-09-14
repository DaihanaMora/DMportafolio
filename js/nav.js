(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var pill = document.querySelector('.nav-pill');
    if (!pill) return;

    var indicator = document.createElement('span');
    indicator.className = 'pill-indicator';
    pill.insertBefore(indicator, pill.firstChild);

    function currentActive() {
      return pill.querySelector('.pill-item.is-active');
    }

    function moveIndicatorTo(item) {
      if (!item) return;
      indicator.style.transform = 'translateX(' + item.offsetLeft + 'px)';
      indicator.style.width = item.offsetWidth + 'px';
    }

    moveIndicatorTo(currentActive());
    window.addEventListener('resize', function () { moveIndicatorTo(currentActive()); });

    var links = Array.prototype.slice.call(pill.querySelectorAll('a[data-section]'));
    if (!links.length) return;

    var sections = links
      .map(function (link) { return document.getElementById(link.dataset.section); })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.dataset.section === id);
      });
      moveIndicatorTo(currentActive());
    }

    var isProgrammaticScroll = false;
    var scrollLockTimer;

    function lockDuringScroll() {
      isProgrammaticScroll = true;
      clearTimeout(scrollLockTimer);
      scrollLockTimer = setTimeout(function () { isProgrammaticScroll = false; }, 800);
    }

    window.addEventListener('scrollend', function () {
      isProgrammaticScroll = false;
      clearTimeout(scrollLockTimer);
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setActive(link.dataset.section);
        lockDuringScroll();
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      if (isProgrammaticScroll) return;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  });
})();
