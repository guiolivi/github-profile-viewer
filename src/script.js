import axios from 'axios';

const input = document.querySelector("#search-input");
const placeholder = document.querySelector(".placeholder");

document.addEventListener("DOMContentLoaded", () => {
    input.value = "";
})

input.addEventListener("input", () => {
    placeholder.style.display = input.value ? "none" : "block";
})

/* Side Functions */

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
})

const moreInfo = document.querySelector("#more-info");
const siteInfo = document.querySelector(".site-info");
const siteInfoClose = document.querySelector("#site-info_close");

moreInfo.addEventListener("click", () => {
    siteInfo.style.opacity === "1" ? siteInfo.style.opacity = "0" : siteInfo.style.opacity = "1";
    siteInfo.style.pointerEvents === "all" ? siteInfo.style.pointerEvents = "none" : siteInfo.style.pointerEvents = "all";
})

siteInfoClose.addEventListener("click", () => {
    siteInfo.style.opacity = "0";
    siteInfo.style.pointerEvents = "none";
})

/* Main Function */

const search = document.querySelector("#search-bar_button");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const result = document.querySelector("#result");
const resultInfo = document.querySelector("#result_info");

let userStatus = document.querySelector("#user_status");
let profilePicture = document.querySelector("#profile-picture");
let linkProfile = document.querySelector("#link-profile");
let userUsername = document.querySelector("#user_username");
let userName = document.querySelector("#user_name");
let userLocation = document.querySelector("#user_location");
let userCompany = document.querySelector("#user_company");
let userDate = document.querySelector("#user_date");
let followerCount = document.querySelector("#user_follower-count");
let followingCount = document.querySelector("#user_following-count");
let repoCount = document.querySelector("#user_repos-count");

const repositories = document.querySelector(".repositories");

const userInformation = async (username) => {
    if (username.trim() === "") return;

    profilePicture.src = "";
    error.style.display = "none";
    repositories.innerHTML = "";
    resultInfo.style.display = "none";
    result.style.display = "flex";
    loading.style.display = "flex";

    return axios.get(`https://api.github.com/users/${username}`)
        .then(usr => {
            const data = usr.data;
            return data;
    })  .catch(err => {
            error.style.display = "flex";
    })  .finally(() => {
        loading.style.display = "none";
    })
}

const userRepos = async (username) => {
    return axios.get(`https://api.github.com/users/${username}/repos`)
        .then(usr => {
            const data = usr.data;
            return data;
        })
}

function requestInfo() {
    userInformation(input.value).then(usr => {
        usr ? resultInfo.style.display = "grid" : resultInfo.style.display = "none";
        usr.user_view_type === "public" ? userStatus.innerHTML = "Public" : userStatus.innerHTML = "Private";
        profilePicture.src = usr.avatar_url;
        linkProfile.href = usr.html_url;
        userUsername.innerHTML = `@${usr.login}`;
        usr.name === null ? userName.innerHTML =`${usr.login}` : userName.innerHTML = `${usr.name}`;
        usr.location === null ? userLocation.innerHTML = "Unknown Location" : userLocation.innerHTML = `${usr.location}`;
        usr.company === null ? userCompany.innerHTML = "Unknown Company" : userCompany.innerHTML = `${usr.company}`;
        const date = new Date(usr.created_at);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        userDate.innerHTML = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
        followerCount.innerHTML = `${usr.followers}`;
        followingCount.innerHTML = `${usr.following}`;
        repoCount.innerHTML = `${usr.public_repos}`;
    })

    userRepos(input.value).then(usr => {
        if (usr === null) {} else {
            usr.forEach(repo => {
                if (repo.description === null) {
                    repo.description = "No description.";
                } if (repo.language === null) {
                    repo.language = "No language";
                }
                let template = document.createElement("template");
                template.innerHTML = `
                            <a class="repository_box" href="${repo.html_url}" target="_blank">
                                <div class="repository_box-wrapper">
                                    <div class="repository_title">${repo.name}</div>
                                    <div class="repository_language">${repo.language}</div>
                                </div>
                                <div class="repository_description">${repo.description}</div>
                            </a>`
                let repoTemplate = template.content.firstElementChild;

                repositories.appendChild(repoTemplate);
            })
        }
    })
}

search.addEventListener("click", () => {
    requestInfo();
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        requestInfo();
    }
})

/* https://api.github.com/search/users?q=${randomLetter}&per_page=30&page=${page} */