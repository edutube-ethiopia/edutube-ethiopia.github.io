(() => {
  "use strict";
  // Official EduTube Ethiopia support inbox.
  const SUPPORT_EMAIL = "support.edutubeethiopia@gmail.com";
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;
    if (!SUPPORT_EMAIL.includes("REPLACE_WITH")) {
      document.querySelectorAll('#page-contact a[href^="mailto:"]').forEach(a => {
        const subject = a.textContent.toLowerCase().includes("partnership") ? "?subject=EduTube%20Partnership" : "";
        a.href = `mailto:${SUPPORT_EMAIL}${subject}`;
        a.textContent = a.textContent.toLowerCase().includes("partnership") ? "Contact partnerships" : SUPPORT_EMAIL;
      });
    }
    form.addEventListener("submit", e => {
      e.preventDefault();
      const status = document.getElementById("contactStatus");
      if (SUPPORT_EMAIL.includes("REPLACE_WITH")) {
        status.textContent = "Contact form is ready, but the site owner must configure the official support email in pdf-contact.js first.";
        status.classList.add("contact-error");
        return;
      }
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const topic = document.getElementById("contactTopic").value;
      const grade = document.getElementById("contactGrade").value;
      const message = document.getElementById("contactMessage").value.trim();
      const subject = `[EduTube] ${topic}`;
      const body = `Name: ${name}\nReply email: ${email}\nTopic: ${topic}\nGrade: ${grade || "N/A"}\n\n${message}`;
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email app should open with the prepared message.";
    });
  });
})();