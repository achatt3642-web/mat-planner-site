(function () {
  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      var open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 900px)").matches) {
          header.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "Open menu");
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!header.classList.contains("is-open")) return;
      if (header.contains(e.target)) return;
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  }

  document.querySelectorAll("a.download-stub").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

  document.querySelectorAll(".copy-btn[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy-target");
      var el = id && document.getElementById(id);
      if (!el) return;
      var text = el.textContent || "";
      function done() {
        btn.classList.add("copied");
        var prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.classList.remove("copied");
          btn.textContent = prev;
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text.trim()).then(done).catch(function () {});
      }
    });
  });
})();
