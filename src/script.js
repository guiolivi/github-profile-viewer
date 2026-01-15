import axios from 'axios';

const input = document.querySelector("#search-input");
const placeholder = document.querySelector(".placeholder");
const teste = document.querySelector("#theme-toggle");

document.addEventListener("DOMContentLoaded", () => {
    input.value = "";
})

input.addEventListener("input", () => {
    placeholder.style.display = input.value ? "none" : "block";
})

/* Main Function */

async function userInformation() {
    axios.get(`https://api.github.com/users/${input.value}`)
        .then(usr => {
        console.log(usr.data)
    }).catch(err => {
        console.log(err)
    })
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        userInformation()
    }
})

/* https://api.github.com/search/users?q=${randomLetter}&per_page=30&page=${page} */