let Username = document.querySelector("input");
let Btn = document.querySelector("button");
let result = document.querySelector(".result");
let errordiv = document.querySelector(".error");
Username.addEventListener("input", () => {
  if (Username.value.trim().length >= 3) {
    Btn.disabled = false;
  } else {
    Btn.disabled = true;
  }
});

Btn.addEventListener("click", () => {
  let user = Username.value.trim();
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((data) => {
      errordiv.innerHTML = "";
      result.innerHTML = `
            <h2>${data.name || data.login}</h2>
            <img src="${data.avatar_url}" width="130">
            <p>@${data.login}</p>
            <p>${data.bio || "This user doesn't have a bio."}</p>
  
            <p>Repositories: ${data.public_repos}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
       
        `;
      Username.value = "";

      Btn.disabled = true;
    })
    .catch((error) => {
      result.innerHTML = "";
      errordiv.innerHTML = "sorry .we could't find this github user.";
    });
});
