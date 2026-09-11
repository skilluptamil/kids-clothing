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
     Bind forms (excluding newsletter forms)
     ------------------------------------------------------------ */
  function bindForms() {
    document.querySelectorAll("form[data-validate]:not(.newsletter-form):not(#newsletterForm)").forEach(function (form) {
      if (form.dataset.lbBound) return;
      form.dataset.lbBound = "1";
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = validateForm(form);
        if (!ok) {
          if (typeof window.showToast === "function") {
            window.showToast("Check the form", "Please fix the highlighted fields.", "error");
          }
          return;
        }
        /* success */
        var successBox = form.querySelector(".form-msg");
        if (successBox) {
          successBox.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i>' +
            (form.dataset.success || "Thank you! Your submission has been received (demo).") + "</span>";
          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        if (typeof window.showToast === "function") {
          window.showToast("Success", form.dataset.success || "Your request has been submitted.", "ok");
        }
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
     Unified Newsletter Submission Handler
     (Footer + sections + coming soon)
     ------------------------------------------------------------ */
  function handleNewsletterSubmit(form, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    var input = form.querySelector("input[type=email]") || form.querySelector("#nlEmail");
    var msg = form.querySelector(".newsletter-msg") || form.querySelector("#newsletterMsg");
    var btn = form.querySelector("button[type=submit]") || form.querySelector("button");

    if (!input) return;

    var val = input.value.trim();
    if (!val || !EMAIL_RE.test(val)) {
      input.focus();
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (msg) {
        msg.className = "form-text newsletter-msg small mt-1 text-danger";
        msg.innerHTML = '<span class="d-inline-flex align-items-center gap-1"><i class="bi bi-exclamation-circle-fill"></i> Please enter a valid email address.</span>';
      }
      if (typeof window.showToast === "function") {
        window.showToast("Invalid Email", "Please enter a valid email address.", "error");
      }
      return;
    }

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    var originalBtnHtml = btn ? btn.innerHTML : "";
    if (btn && !btn.dataset.submitting) {
      btn.dataset.submitting = "1";
      btn.innerHTML = '<i class="bi bi-check2-circle me-1"></i>Subscribed!';
      btn.classList.add("btn-success");
      btn.disabled = true;
    }

    if (msg) {
      msg.className = "form-text newsletter-msg small mt-1 text-success fw-bold";
      msg.innerHTML = '<span class="d-inline-flex align-items-center flex-wrap gap-1"><i class="bi bi-check-circle-fill"></i> 🎉 Thank you for joining! Use code <span class="newsletter-badge">BLOOM15</span> for 15% off.</span>';
    }

    if (typeof window.showToast === "function") {
      window.showToast("🎉 Welcome to LittleBloom!", "You're subscribed! Use discount code BLOOM15 for 15% off your order.", "ok");
    }

    input.value = "";

    setTimeout(function () {
      if (btn) {
        btn.innerHTML = originalBtnHtml;
        btn.classList.remove("btn-success");
        btn.disabled = false;
        delete btn.dataset.submitting;
      }
      if (input) {
        input.classList.remove("is-valid");
      }
    }, 4000);
  }

  function bindNewsletters() {
    document.querySelectorAll("#newsletterForm, .newsletter-form, form.footer-newsletter, #comingSoonForm").forEach(function (form) {
      if (form.dataset.nlBound) return;
      form.dataset.nlBound = "1";
      form.addEventListener("submit", function (e) {
        handleNewsletterSubmit(form, e);
      });
    });
  }

  // Delegated submission listener for dynamically injected footers or templates
  document.addEventListener("submit", function (e) {
    var form = e.target.closest("#newsletterForm, .newsletter-form, form.footer-newsletter, #comingSoonForm");
    if (form) {
      handleNewsletterSubmit(form, e);
    }
  }, true);

  window.bindNewsletters = bindNewsletters;
  window.handleNewsletterSubmit = handleNewsletterSubmit;

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindForms(); bindPasswordToggles(); bindNewsletters();
    });
  } else {
    bindForms(); bindPasswordToggles(); bindNewsletters();
  }
  window.addEventListener("load", function () {
    bindPasswordToggles();
    bindNewsletters();
  });
})();
