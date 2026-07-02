function flipCard() {
  document.getElementById('digitalCard').classList.toggle('is-flipped');
}

function updateCardData() {
  const name = document.getElementById('inputName').value;
  const dept = document.getElementById('inputDept').value;
  const link = document.getElementById('inputLink').value;

  document.getElementById('cardName').innerText = name || "Your Name";
  document.getElementById('cardDept').innerText = dept || "Your Subtitle";
  document.getElementById('cardLink').innerText = link || "Your Link";

  // Dynamic QR Code Generator Feature
  const qrImage = document.getElementById('cardQR');
  if (link.trim() !== "") {
    // encodeURIComponent handles special characters safely inside the URL string
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`;
  } else {
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hello";
  }
}

function updatePhoto(event) {
  const reader = new FileReader();
  reader.onload = function() {
    document.getElementById('cardPhoto').src = reader.result;
  }
  if(event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
}

function addNewField() {
  const fieldText = prompt("What extra details would you like to display on the front? (e.g., 'Blood Group: O+')");
  if (fieldText) {
    const container = document.getElementById('dynamicFieldsFront');
    const newParagraph = document.createElement('p');
    newParagraph.innerText = fieldText;
    newParagraph.style.margin = "5px 0";
    container.appendChild(newParagraph);
  }
}

function downloadStandAloneCard() {
  const cardHTML = document.querySelector('.card-container').outerHTML;
  
  const fullFileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Digital Card Copy</title>
  <style>
    body { background: #b2c9c8; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin:0; font-family: sans-serif; }
    .card-container { width: 320px; height: 500px; perspective: 1200px; }
    .card { width:100%; height:100%; position:relative; transform-style:preserve-3d; transition:transform 0.7s; cursor:pointer;}
    .card.is-flipped { transform: rotateY(180deg); }
    .card-face { position:absolute; width:100%; height:100%; backface-visibility:hidden; border-radius:20px; padding:24px; box-sizing:border-box; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .card-front { background:#fff; color:#222; }
    .card-back { background:#141414; color:#fff; transform:rotateY(180deg); display:flex; flex-direction:column; justify-content:space-between; }
    .photo-container { width:140px; height:170px; margin:30px auto 15px auto; border-radius:12px; overflow:hidden; background:#eee; }
    .photo-container img { width:100%; height:100%; object-fit:cover; }
    .qr-code-zone { background: white; padding:10px; width:100px; height:100px; margin:0 auto; border-radius:8px; }
    .qr-code-zone img { width:100%; height:100%; }
    .card-body h2 { text-align:center; margin:10px 0 5px 0; }
    .card-body p { text-align:center; color:#666; margin:0; }
    .link-text { word-break:break-all; color:#00a8ff; }
    .all-access-title { font-size:32px; margin:0; }
    .coordinates { font-size:11px; color:#888; }
  </style>
</head>
<body>
  ${cardHTML}
  <script>
    function flipCard() {
      document.querySelector('.card').classList.toggle('is-flipped');
    }
  <\/script>
</body>
</html>`;

  const blob = new Blob([fullFileContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my-digital-card.html";
  link.click();
}
