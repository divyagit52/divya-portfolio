/* ==========================================================================
   main.js — behaviour layer
   DESIGN.md §6 Motion & Interaction

   Four jobs, nothing decorative:
     1. Reveal-on-enter      (IntersectionObserver, never a scroll listener)
     2. Nav state            (scrolled chrome + scroll-spy aria-current)
     3. Mobile menu          (burger morph, focus trap, Escape, scroll lock)
     4. OrderTracker         (the signature moment — a real status advance)

   Every motion path is gated on prefers-reduced-motion. With motion reduced
   the page still renders every state correctly, just without the animation.
   ========================================================================== */
(function () {
  "use strict";

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = motionQuery.matches;
  var hasIO = "IntersectionObserver" in window;

  /* ------------------------------------------------------------------
     1. REVEAL ON ENTER
     .reveal -> .reveal.is-in  (translateY + blur settle, Emphasis 760ms)
     Unobserve after firing: a reveal is a one-shot, not a scroll effect.
     ------------------------------------------------------------------ */
  function initReveals() {
    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    // No IO or motion reduced -> paint the settled state immediately.
    if (!hasIO || reduced) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-in");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
  }

  /* ------------------------------------------------------------------
     2. NAV — scrolled chrome + scroll-spy
     ------------------------------------------------------------------ */
  function initNavChrome(nav) {
    if (!nav || !hasIO) return;

    // A 1px sentinel at the top of the document replaces a scroll listener.
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:10px;pointer-events:none;";
    document.body.prepend(sentinel);

    new IntersectionObserver(function (entries) {
      nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  function initScrollSpy(nav) {
    if (!nav || !hasIO) return;

    var links = nav.querySelectorAll(".nav__link");
    if (!links.length) return;

    var map = [];
    for (var i = 0; i < links.length; i++) {
      var id = (links[i].getAttribute("href") || "").slice(1);
      var section = id ? document.getElementById(id) : null;
      if (section) map.push({ link: links[i], section: section });
    }
    if (!map.length) return;

    function mark(active) {
      map.forEach(function (pair) {
        if (pair.section === active) {
          pair.link.setAttribute("aria-current", "true");
        } else {
          pair.link.removeAttribute("aria-current");
        }
      });
    }

    var visible = [];

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var at = visible.indexOf(entry.target);
          if (entry.isIntersecting && at === -1) visible.push(entry.target);
          if (!entry.isIntersecting && at !== -1) visible.splice(at, 1);
        });

        if (!visible.length) {
          mark(null);
          return;
        }

        // Whichever qualifying section sits highest in the document wins.
        var winner = visible[0];
        visible.forEach(function (node) {
          if (node.offsetTop < winner.offsetTop) winner = node;
        });
        mark(winner);
      },
      // Only count a section once it crosses the upper-middle reading band.
      { rootMargin: "-42% 0px -50% 0px" }
    );

    map.forEach(function (pair) {
      spy.observe(pair.section);
    });
  }

  /* ------------------------------------------------------------------
     3. MOBILE MENU
     Burger morphs to an X via aria-expanded (CSS owns the transform).
     Overlay: [hidden] -> visible -> .is-open so the transition can run.
     ------------------------------------------------------------------ */
  function initMenu(nav) {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("menu");
    if (!burger || !menu) return;

    var root = document.documentElement;
    var lastFocused = null;
    var closeTimer = null;
    var isOpen = false;

    function focusables() {
      return menu.querySelectorAll("a[href], button:not([disabled])");
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      window.clearTimeout(closeTimer);

      lastFocused = document.activeElement;
      menu.hidden = false;
      root.style.overflow = "hidden";
      burger.setAttribute("aria-expanded", "true");
      burger.querySelector(".sr-only").textContent = "Close menu";

      // Next frame, so the browser registers the pre-transition state first.
      window.requestAnimationFrame(function () {
        menu.classList.add("is-open");
      });

      var first = focusables()[0];
      if (first) first.focus();
    }

    function close(restoreFocus) {
      if (!isOpen) return;
      isOpen = false;

      menu.classList.remove("is-open");
      root.style.overflow = "";
      burger.setAttribute("aria-expanded", "false");
      burger.querySelector(".sr-only").textContent = "Open menu";

      if (restoreFocus) {
        var back = lastFocused && lastFocused.isConnected ? lastFocused : burger;
        back.focus();
      }

      // Keep it in the a11y tree until the fade-out finishes.
      closeTimer = window.setTimeout(
        function () {
          if (!isOpen) menu.hidden = true;
        },
        reduced ? 0 : 420
      );
    }

    burger.addEventListener("click", function () {
      if (isOpen) close(true);
      else open();
    });

    // Navigating via the overlay should dismiss it.
    menu.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (link) close(false);
    });

    document.addEventListener("keydown", function (event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }

      if (event.key !== "Tab") return;

      // Focus trap.
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Crossing into the desktop layout hides the burger — drop the overlay too.
    var desktop = window.matchMedia("(min-width: 768px)");
    var onBreakpoint = function (event) {
      if (event.matches) close(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);

    if (nav) nav.setAttribute("data-menu-ready", "true");
  }

  /* ------------------------------------------------------------------
     4. ORDER TRACKER — the signature moment
     A working miniature of the Fikamoja order status flow:
     Placed -> Packed -> Out for delivery -> Delivered.
     Pauses whenever it is off-screen or the tab is hidden.
     ------------------------------------------------------------------ */
  function initTracker() {
    var root = document.getElementById("tracker");
    if (!root) return;

    var steps = root.querySelectorAll(".tracker__step");
    if (steps.length < 2) return;

    var CHECK =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"></use></svg>';
    var STEP_MS = 2100;
    var HOLD_MS = 3200;

    // Settled state the markup ships with; also the reduced-motion state.
    if (reduced || !hasIO) return;

    var cursor = 1;
    var timer = null;
    var onScreen = false;

    function paint(active) {
      for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var dot = step.querySelector(".tracker__dot");
        var done = i < active || active >= steps.length;

        step.classList.toggle("is-done", done);
        step.classList.toggle("is-active", i === active);

        if (!dot) continue;
        if (done && !dot.firstElementChild) dot.innerHTML = CHECK;
        if (!done && dot.firstElementChild) dot.textContent = "";
      }
    }

    function tick() {
      cursor += 1;
      // One past the last step = every step delivered; hold, then restart.
      if (cursor > steps.length) cursor = 0;
      paint(cursor);
      schedule(cursor === steps.length ? HOLD_MS : STEP_MS);
    }

    function schedule(delay) {
      window.clearTimeout(timer);
      if (!onScreen || document.hidden) return;
      timer = window.setTimeout(tick, delay);
    }

    new IntersectionObserver(
      function (entries) {
        onScreen = entries[0].isIntersecting;
        if (onScreen) schedule(STEP_MS);
        else window.clearTimeout(timer);
      },
      { threshold: 0.35 }
    ).observe(root);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) window.clearTimeout(timer);
      else schedule(STEP_MS);
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function boot() {
    var nav = document.getElementById("nav");

    initReveals();
    initNavChrome(nav);
    initScrollSpy(nav);
    initMenu(nav);
    initTracker();

    // Respond live if the user flips the OS motion setting.
    var onMotionChange = function (event) {
      reduced = event.matches;
      if (reduced) {
        var targets = document.querySelectorAll(".reveal");
        for (var i = 0; i < targets.length; i++) {
          targets[i].classList.add("is-in");
        }
      }
    };
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", onMotionChange);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(onMotionChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
