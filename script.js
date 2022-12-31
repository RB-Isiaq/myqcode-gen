const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  if (url === "") {
    alert("Please enter URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
        createShareBtn(url);
      }, 50);
    }, 1000);
  }
  console.log(url, size);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};
const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  const shareLink = document.getElementById("share-qr-code");
  if (saveLink) saveLink.remove();
  if (shareLink) shareLink.remove();
};
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Download Image";
  document.getElementById("generated").appendChild(link);
};

const createShareBtn = (url) => {
  const shareBtn = document.createElement("button");
  shareBtn.id = "share-qr-code";
  shareBtn.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5 mt-0";
  shareBtn.innerHTML = `Share Link  <i class="fa-sharp fa-solid fa-share"></i>`;
  document.getElementById("generated").appendChild(shareBtn);
  const shareData = {
    title: "Your QR Link",
    url,
  };
  shareBtn.addEventListener("click", async () => {
    try {
      console.log(shareData.url);
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  });
};
hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
