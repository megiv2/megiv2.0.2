document.addEventListener("DOMContentLoaded", function () {
  const releaseBtn = document.getElementById("releaseBtn");
  const landing = document.getElementById("landing");
  const loading = document.getElementById("loading");
  const logEntry = document.getElementById("logEntry");
  const logText = document.getElementById("logText");
  const audio = document.getElementById("logAudio");
  const textarea = document.querySelector("textarea");

  const logMessage = "log_entry_032 berjaya. emosi sedang diproses...";

  function playClickSound() {
    const click = new Audio("https://freesound.org/data/previews/522/522172_11526494-lq.mp3");
    click.play();
  }

  function glitchTypeWriter(text, target, interval = 100) {
    let index = 0;
    const glitch = setInterval(() => {
      if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(glitch);
      }
    }, interval);
  }

  releaseBtn.addEventListener("click", () => {
    playClickSound();

    // Zoom and fade out landing
    landing.style.transition = "transform 2s ease, opacity 2s ease";
    landing.style.transform = "scale(1.2)";
    landing.style.opacity = 0;

    setTimeout(() => {
      landing.classList.add("hidden");
      loading.classList.remove("hidden");

      setTimeout(() => {
        loading.classList.add("hidden");
        logEntry.classList.remove("hidden");
        audio.pause();
        audio.currentTime = 0;
        audio.load(); // Force reload for mobile
        audio.play().catch(() => {
          console.log("Audio play failed on mobile.");
        });
        glitchTypeWriter(logMessage, logText, 100);

        setTimeout(() => {
          logEntry.classList.add("hidden");
          landing.classList.remove("hidden");
          landing.style.transform = "scale(1)";
          landing.style.opacity = 1;
          textarea.value = ""; // Clear the text box
          logText.textContent = ""; // Reset log text
        }, 34000);
      }, 3000);
    }, 2000);
  });
});
