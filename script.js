const prices = {
  fp: { name: "Flower Pot Big", price: 120 },
  gc: { name: "Ground Chakkar Deluxe", price: 150 }
};

function changeQty(id, change) {
  let el = document.getElementById(id);
  let val = parseInt(el.innerText) + change;
  if (val < 0) val = 0;
  el.innerText = val;
}

function generateInvoice() {
  const name = document.getElementById("name").value || "-";
  const address = document.getElementById("address").value || "-";

  let total = 0;
  let html = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Address:</b> ${address}</p>
    <table>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Amount</th>
      </tr>
  `;

  for (let id in prices) {
    const qty = parseInt(document.getElementById(id).innerText);
    if (qty > 0) {
      const amount = qty * prices[id].price;
      total += amount;
      html += `
        <tr>
          <td>${prices[id].name}</td>
          <td>${qty}</td>
          <td>₹${amount}</td>
        </tr>
      `;
    }
  }

  html += `
      <tr>
        <th colspan="2">Total</th>
        <th>₹${total}</th>
      </tr>
    </table>
  `;

  document.getElementById("invoiceContent").innerHTML = html;
  document.getElementById("invoice").classList.remove("hidden");
}

function downloadInvoice() {
  generateInvoice();

  const invoice = document.getElementById("invoice");

  const options = {
    margin: 10,
    filename: 'KUKU-Crackers-Invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(invoice).set(options).save();
}

function sendWhatsApp() {
  generateInvoice();

  let message = `🧾 *KUKU Crackers Order*\n\n`;

  for (let id in prices) {
    const qty = parseInt(document.getElementById(id).innerText);
    if (qty > 0) {
      message += `${prices[id].name} : ${qty}\n`;
    }
  }

  message += `\n📎 Please attach the invoice PDF\n💰 GPay: +91-9597013244`;

  const phone = "+91-9597013244"; // YOUR NUMBER
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}
