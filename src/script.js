import axios from 'axios';

const input = document.querySelector("#search-input");
const placeholder = document.querySelector(".placeholder");

input.addEventListener("input", () => {
    placeholder.style.display = input.value ? "none" : "block";
})