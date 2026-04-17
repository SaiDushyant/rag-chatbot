(function () {
  const currentSite = encodeURIComponent(window.location.origin);

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-end";

  const iframe = document.createElement("iframe");
  iframe.src = `https://rag-chatbot-mocha-eight.vercel.app/?site=${currentSite}`;

  iframe.style.width = "380px";
  iframe.style.height = "550px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
  iframe.style.marginBottom = "10px";
  iframe.style.transition = "all 0.3s ease";
  iframe.style.display = "block";

  const button = document.createElement("button");
  button.innerHTML = "✖";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.background = "#2563eb";
  button.style.color = "#fff";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";

  let isOpen = true;

  button.onclick = () => {
    isOpen = !isOpen;

    if (isOpen) {
      iframe.style.display = "block";
      button.innerHTML = "✖";
    } else {
      iframe.style.display = "none";
      button.innerHTML = "💬";
    }
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();
