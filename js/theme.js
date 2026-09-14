(function () {
  function getSavedTheme() {
    try { return window.localStorage.getItem('dm-theme'); } catch (e) { return null; }
  }
  function setSavedTheme(theme) {
    try { window.localStorage.setItem('dm-theme', theme); } catch (e) {}
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  var saved = getSavedTheme();
  applyTheme(saved === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.setAttribute('aria-pressed', document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      setSavedTheme(next);
    });
  });
})();
