function showPage(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(function (page) {
    page.style.display = "none";
  });

  // Show the selected page
  document.getElementById(page).style.display = "block";
}

function logout() {
  alert("Logging out...");
  // Implement your logout functionality here
}

// Initially display the home page
document.addEventListener("DOMContentLoaded", function () {
  showPage("home");
});

// Three.js code
let scene, camera, renderer, model;

function init() {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer and add it to the DOM
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document
    .getElementById("background-container")
    .appendChild(renderer.domElement);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Load a 3D model (replace with your own model file path)
  const loader = new THREE.GLTFLoader();
  loader.load(
    "path/to/your/model.gltf",
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

let currentSlide = 0;

function showSlide(index) {
  const slider = document.getElementById("video-slider");
  const slides = document.querySelectorAll(".slide");
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

const searchInput = document.getElementById("top_searchbar");
const searchContainer = document.querySelector("header_center_nav");

searchInput.addEventListener("focus", () => {
  searchContainer.classList.add("expanded");
});

searchInput.addEventListener("blur", () => {
  if (searchInput.value.trim() === "") {
    searchContainer.classList.remove("expanded");
  }
});
