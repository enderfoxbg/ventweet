// Adblocker
function getAds() {
  const ads = [];
  document
    .querySelectorAll("article[data-testid=tweet]:not(.processed)")
    .forEach((tweet) => {
      const span = tweet.querySelector(
        "div.r-1kkk96v span.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
      );
      if (span && span.innerText === "Ad") {
        ads.push(tweet);
      }
    });
  return ads;
}

function hideAds() {
  getAds().forEach((tweet) => {
    tweet.classList.add("processed");
    tweet.style.display = "none";
  });
}

// Replace content
function replaceContent() {
  // Text
  document.querySelectorAll('[role="heading"]').forEach((heading) => {
    if (heading.textContent === "Happening now") {
      heading.textContent = "Ventweet";
    }
  });
  document.querySelectorAll("span").forEach((span) => {
    if (span.textContent === "Post") {
      span.textContent = "Tweet";
    }
  });
  document.querySelectorAll("span").forEach((span) => {
    if (span.textContent === "Upgrade to Premium") {
      span.textContent = "Waste your Money";
    }
  });

  // Logos
  const svgElements = document.querySelectorAll('svg[class*="r-4qtqp9"]');
  svgElements.forEach((svg) => {
    if (svg.innerHTML.includes("M18.244 2.25h3.308l-7.227")) {
      svg.innerHTML = `
                    <g>
                        <path fill="#1DA1F2" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
            `;
    }
  });

  // Title
  if (document.title.includes("X")) {
    document.title = document.title.replace("X", "Ventweet");
  }
}

const processedElements = new WeakSet();
const observer = new MutationObserver(() => {
  hideAds();
  replaceContent();
});

if (!window.ventweetInitialized) {
  window.ventweetInitialized = true;
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  hideAds();
  replaceContent();
}

window.addEventListener("popstate", () => {
  hideAds();
  replaceContent();
});
setTimeout(() => {
  observer.disconnect();
}, 30000);
