const prices = {
  fp: 120,
  gc: 150
};

function changeQty(id, change) {
  let el = document.getElementById(id);
  let val = parseInt(el.innerText) + change;
  if (val < 0) val = 0;
  el.innerText = val;
}

function generateInvoice() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;

  let total = 0;
  let html = `<p><b>Name:</b> ${name}</p><p><b>Address:</b> ${address}</p><table>`;
  html += `<tr><th>Item</th><th>Qty</th><th>Price</th></tr>`;

  for (let id in prices) {
    const qty = parseInt(document.getElementById(id).innerText);
    if (qty > 0) {
      const cost = qty * prices[id];
      total += cost;
      html += `<tr><td>${id}</td><td>${qty}</td><td>₹${cost}</td></tr>`;
    }
  }

  html += `</table><h3>Total: ₹${total}</h3>`;

  document.getElementById("invoiceContent").innerHTML = html;
  document.getElementById("invoice").classList.remove("hidden");
}

function sendWhatsApp() {
  generateInvoice();
  const text = document.getElementById("invoiceContent").innerText;
  const phone = "91XXXXXXXXXX"; // your number
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
}

function downloadInvoice() {
  generateInvoice();
  window.print();
}
