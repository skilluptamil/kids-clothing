/* ==========================================================================
   LITTLE BLOOM — Form Validation & UI Helpers
   --------------------------------------------------------------------------
   File   : assets/js/validation.js
   Notes  : Custom front-end validation for all template forms plus password
            visibility toggles. All demo forms are front-end only.
   ========================================================================== */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ------------------------------------------------------------
     Validate a single input
     ------------------------------------------------------------ */
  function validateInput(input) {
    var field = input.closest(".form-field") || input;
    var ok = true;
    var msg = "";

    if (input.required && !input.value.trim()) {
      ok = false; msg = "This field is required.";
    } else if (input.type === "email" && input.value.trim() && !EMAIL_RE.test(input.value.trim())) {
      ok = false; msg = "Please enter a valid email address.";
    } else if (input.minLength && input.value.trim().length < parseInt(input.minLength, 10)) {
      ok = false; msg = "Must be at least " + input.minLength + " characters.";
    } else if (input.dataset.match) {
      var matchEl = document.getElementById(input.dataset.match);
      if (matchEl && input.value !== matchEl.value) {
        ok = false; msg = "Passwords do not match.";
      }
    } else if (input.type === "checkbox" && input.required && !input.checked) {
      ok = false; msg = "Please tick this box to continue.";
    }

    field.classList.toggle("is-invalid", !ok);
    field.classList.remove("is-valid");
    if (ok && input.value.trim()) field.classList.add("is-valid");

    var err = field.querySelector(".error-msg");
    if (err) err.textContent = msg;

    input.setAttribute("aria-invalid", ok ? "false" : "true");
    return ok;
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll("input, select, textarea");
    var allOk = true;
    var firstInvalid = null;
    inputs.forEach(function (input) {
      if (input.disabled) return;
      var ok = validateInput(input);
      if (!ok && !firstInvalid) firstInvalid = input;
      allOk = allOk && ok;
    });
    if (!allOk && firstInvalid) firstInvalid.focus();
    return allOk;
  }

  /* ------------------------------------------------------------
     Bind forms
     ------------------------------------------------------------ */
  function bindForms() {
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = validateForm(form);
        if (!ok) {
          showToast("Check the form", "Please fix the highlighted fields.", "error");
          return;
        }
        /* success */
        var successBox = form.querySelector(".form-msg");
        if (successBox) {
          successBox.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i>' +
            (form.dataset.success || "Thank you! Your submission has been received (demo).") + "</span>";
          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        showToast("Success", form.dataset.success || "Your request has been submitted.", "ok");
        form.reset();
        form.querySelectorAll(".is-valid").forEach(function (el) { el.classList.remove("is-valid"); });
      });

      /* live re-validation */
      form.addEventListener("input", function (e) {
        var t = e.target;
        if (t.classList && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) {
          validateInput(t);
        }
      });
      form.addEventListener("change", function (e) {
        var t = e.target;
        if (t.classList && t.tagName === "SELECT") validateInput(t);
      });
    });
  }

  /* ------------------------------------------------------------
     Password visibility toggle
     ------------------------------------------------------------ */
  function bindPasswordToggles() {
    document.querySelectorAll(".password-toggle").forEach(function (btn) {
      if (btn.dataset.lbBound) return;
      btn.dataset.lbBound = "1";
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("data-target"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.innerHTML = '<i class="bi bi-eye' + (show ? "" : "-slash") + '"></i>';
        btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  /* ------------------------------------------------------------
     Newsletter forms (footer + standalone sections)
     ------------------------------------------------------------ */
  function bindNewsletters() {
    document.querySelectorAll("#newsletterForm").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=email]");
        var msg = form.querySelector(".newsletter-msg");
        if (!input || !EMAIL_RE.test(input.value.trim())) {
          if (input) input.focus();
          if (msg) { msg.classList.add("err"); msg.classList.remove("ok"); msg.textContent = "Please enter a valid email address."; }
          return;
        }
        if (msg) { msg.classList.add("ok"); msg.classList.remove("err"); msg.textContent = "🎉 You're subscribed! Watch your inbox for little treats."; }
        showToast("Subscribed!", "Welcome to the LittleBloom family.", "ok");
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------
     Coming-soon subscription form
     ------------------------------------------------------------ */
  function bindComingSoon() {
    var form = document.getElementById("comingSoonForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=email]");
      if (!input || !EMAIL_RE.test(input.value.trim())) {
        if (input) input.focus();
        showToast("Check the form", "Please enter a valid email address.", "error");
        return;
      }
      showToast("You're on the list!", "We'll let you know the moment we launch.", "ok");
      form.reset();
    });
  }

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindForms(); bindPasswordToggles(); bindNewsletters(); bindComingSoon();
    });
  } else {
    bindForms(); bindPasswordToggles(); bindNewsletters(); bindComingSoon();
  }
  window.addEventListener("load", function () {
    bindPasswordToggles();
  });
})();
