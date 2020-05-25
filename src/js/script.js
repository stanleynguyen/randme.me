const theMeme = document.querySelector("#the-meme");
const memeLoader = document.querySelector("#meme-loader");
const randomizer = document.querySelector("#randomizer");

theMeme.onload = function () {
  memeLoader.style.display = "none";
  theMeme.style.display = "block";
};

randomizer.onclick = function () {
  memeLoader.style.display = "block";
  theMeme.style.display = "none";
  theMeme.src = "https://img.randme.me?" + Date.now();
  console.log("reload");
};
