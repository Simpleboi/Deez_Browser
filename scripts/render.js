window.onload = () => {
  const webview = document.getElementById("webview");
  const navUrlInput = document.getElementById("nav-url");
  const mainUrlInput = document.getElementById("main-url");
  const navGoButton = document.getElementById("nav-go");
  const mainGoButton = document.getElementById("main-go");
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");
  const refreshButton = document.getElementById("refresh");

  // Helper function to ensure URLs have the correct protocol
  function formatUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
      return "https://" + url;
    }
    return url;
  }

  // Update both input fields to sync
  function syncInputs(url) {
    navUrlInput.value = url;
    mainUrlInput.value = url;
  }

  // Function to handle URL navigation
  function navigateToUrl(url) {
    const formattedUrl = formatUrl(url);
    webview.src = formattedUrl; // Use your webview to load the URL
    syncInputs(formattedUrl);
  }

  // Event listeners for Go button and Enter key
  function addEventListeners(inputElement, goButton) {
    // Clicking Go Button
    goButton.addEventListener("click", () => {
      navigateToUrl(inputElement.value);
    });

    // Pressing Enter key
    inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        navigateToUrl(inputElement.value);
      }
    });
  }

  // Sync and trigger events for both inputs
  addEventListeners(navUrlInput, navGoButton);
  addEventListeners(mainUrlInput, mainGoButton);

  // Navigation buttons
  backButton.addEventListener("click", () => {
    webview.goBack();
  });

  forwardButton.addEventListener("click", () => {
    webview.goForward();
  });

  refreshButton.addEventListener("click", () => {
    webview.reload();
  });

  // Update both URL inputs when webview navigates
  webview.addEventListener("did-navigate", (event) => {
    syncInputs(event.url);
  });
};
