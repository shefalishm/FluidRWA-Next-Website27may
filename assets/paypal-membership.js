(function () {
  const dialog = document.getElementById("paypalMembershipDialog");
  const container = document.getElementById("paypalMembershipButtons");
  const copy = document.getElementById("paypalMembershipCopy");
  const status = document.getElementById("paypalMembershipStatus");
  const close = dialog && dialog.querySelector(".paypal-dialog-close");

  if (!dialog || !container || !copy || !status) return;

  function closeDialog() {
    dialog.close();
    container.replaceChildren();
    status.textContent = "";
  }

  function renderCheckout(trigger) {
    const paypalPlan = trigger.dataset.paypalPlan;
    const sitePlan = trigger.dataset.plan;
    const planName = trigger.dataset.planName;
    const price = trigger.dataset.price;

    copy.textContent = `${planName} membership at ${price}. PayPal will manage the recurring subscription and you can cancel future renewals from your PayPal account.`;
    status.textContent = "";
    container.replaceChildren();
    dialog.showModal();

    if (!window.paypal || !window.paypal.Buttons) {
      status.textContent = "PayPal is still loading. Please close this window and try again in a moment.";
      return;
    }

    window.paypal.Buttons({
      style: { shape: "rect", color: "gold", layout: "vertical", label: "subscribe" },
      createSubscription(data, actions) {
        return actions.subscription.create({ plan_id: paypalPlan });
      },
      onApprove(data) {
        const params = new URLSearchParams({
          payment: "paypal",
          membership: "paid-vetted-vendor",
          plan: sitePlan,
          subscription: data.subscriptionID || ""
        });
        window.location.assign(`/apply-as-vendor.html?${params.toString()}`);
      },
      onCancel() {
        status.textContent = "The subscription was not completed. You can retry whenever you are ready.";
      },
      onError() {
        status.textContent = "PayPal could not start the subscription. Please retry or contact contact@fluidrwa.com.";
      }
    }).render(container);
  }

  document.querySelectorAll(".paypal-plan-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => renderCheckout(trigger));
  });

  close?.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });
})();
