import axios from 'axios';

const input = document.querySelector("#search-input");
const placeholder = document.querySelector(".placeholder");

document.addEventListener("DOMContentLoaded", () => {
    input.value = "";
})

input.addEventListener("input", () => {
    placeholder.style.display = input.value ? "none" : "block";
})