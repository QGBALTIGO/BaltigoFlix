(() => {
  "use strict";

  const API_BASE =
    "https://afiliados-baltigoflix-production.up.railway.app/api/affiliate/";
  const slug = (new URLSearchParams(window.location.search).get("afiliado") || "")
    .trim()
    .toLowerCase();

  if (!slug) return;

  const buttons = Array.from(document.querySelectorAll("[data-affiliate-plan]"));

  const showError = () => {
    const notice = document.createElement("div");
    notice.setAttribute("role", "alert");
    notice.textContent =
      "Não foi possível validar os links deste parceiro. Atualize a página ou fale com o suporte.";
    Object.assign(notice.style, {
      position: "fixed",
      inset: "0 0 auto 0",
      zIndex: "2147483647",
      padding: "14px 18px",
      background: "#991b1b",
      color: "#fff",
      font: "600 14px/1.45 system-ui, sans-serif",
      textAlign: "center",
    });
    document.body.prepend(notice);
  };

  if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(slug) || slug.includes("--")) {
    showError();
    return;
  }

  if (buttons.length !== 4) {
    showError();
    return;
  }

  buttons.forEach((button) => {
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
    button.setAttribute("aria-busy", "true");
    button.style.cursor = "wait";
  });

  fetch(`${API_BASE}${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Affiliate API returned ${response.status}`);
      return response.json();
    })
    .then((payload) => {
      const targets = buttons.map((button) => {
        const plan = button.dataset.affiliatePlan;
        const checkout = payload.checkouts && payload.checkouts[plan];
        if (typeof checkout !== "string") throw new Error("Missing checkout");

        const url = new URL(checkout);
        if (url.protocol !== "https:" || url.hostname !== "pay.cakto.com.br") {
          throw new Error("Unexpected checkout host");
        }
        return [button, url.href];
      });

      targets.forEach(([button, checkout]) => {
        button.href = checkout;
        button.removeAttribute("aria-disabled");
        button.removeAttribute("aria-busy");
        button.style.removeProperty("cursor");
        button.rel = "nofollow sponsored noopener";
      });
      document.documentElement.dataset.affiliate = payload.slug;
    })
    .catch(() => {
      showError();
      buttons.forEach((button) => {
        button.removeAttribute("aria-busy");
        button.style.removeProperty("cursor");
      });
    });
})();
