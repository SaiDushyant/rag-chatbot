(function () {
  const currentSite = encodeURIComponent(window.location.origin);

  const iframe = document.createElement("iframe");

  iframe.src = `https://rag-chatbot-mocha-eight.vercel.app/?site=${currentSite}`;

  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "350px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";

  document.body.appendChild(iframe);
})();
