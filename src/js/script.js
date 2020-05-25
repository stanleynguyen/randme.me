const theMeme = document.querySelector("#the-meme");
const memeLoader = document.querySelector("#meme-loader");
const randomizer = document.querySelector("#randomizer");
const dialogOpener = document.querySelector("#dialog-opener");
const dialog = document.getElementById("submit-dialog");
const fileInput = document.querySelector('#submit-dialog input[type="file"]');
const previewImg = document.querySelector("#previewer .img-fluid");
dialogPolyfill.registerDialog(dialog);

if (window.location.pathname !== "/") {
  randomizer.style.display = "none";

  const directLinkToMeme = `https://img.randme.me${window.location.pathname}`;
  theMeme.src = directLinkToMeme;
  const bubbleAnchor = document.querySelector("#meme-link");
  bubbleAnchor.href = directLinkToMeme;
  bubbleAnchor.textContent = directLinkToMeme;

  const linkToMeme = window.location.href;
  document.querySelector(
    "#twitter-share"
  ).href = `https://twitter.com/share?text=rand(meme)%20%7C%20%F0%9F%8C%9A%20Meme-as-a-Service&amp;url=${encodeURI(
    linkToMeme
  )}`;
  document.querySelector(
    "#fb-share"
  ).href = `https://www.facebook.com/sharer.php?u=${encodeURI(linkToMeme)}`;
  document.querySelector(
    "#reddit-share"
  ).href = `https://reddit.com/submit?title=rand(meme)%20%7C%20%F0%9F%8C%9A%20Meme-as-a-Service&amp;url=${encodeURI(
    linkToMeme
  )}`;
}

theMeme.onload = function () {
  memeLoader.style.display = "none";
  theMeme.style.display = "block";
};

randomizer.onclick = function () {
  memeLoader.style.display = "block";
  theMeme.style.display = "none";
  theMeme.src = "https://img.randme.me?" + Date.now();
};

dialogOpener.onclick = function () {
  dialog.showModal();
};

var reader = new FileReader();

reader.onload = function (e) {
  previewImg.src = e.target.result;
};
fileInput.onchange = function () {
  if (this.files && this.files[0]) {
    reader.readAsDataURL(this.files[0]); // convert to base64 string
    document.querySelector("#submit-dialog label.nes-btn span").textContent =
      "Select another file";
    document.querySelector("#previewer").style.display = "flex";
  }
};

const errTxt = document.querySelector("#submit-dialog .is-error");
document.querySelector("#submit-btn").onclick = function (e) {
  e.preventDefault();
  const submitBtn = this;
  const formData = new FormData();
  if (!fileInput.files || !fileInput.files[0]) {
    return;
  }
  formData.append("image", fileInput.files[0]);
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  fetch("https://img.randme.me", {
    method: "POST",
    body: formData,
  })
    .then(function (res) {
      if (res.status > 299 || res.status < 200) {
        throw new Error(`Failed to submit with status code ${res.status}`);
      }
      res.json().then(function (jsonObj) {
        window.location.href = `${window.location.origin}/${jsonObj.id}`;
      });
    })
    .catch(function (err) {
      console.error(err);
      errTxt.style.display = "block";
      setTimeout(function () {
        errTxt.style.display = "none";
      }, 5000);
      submitBtn.innerHTML = "Confirm";
      submitBtn.disabled = false;
    });
};
