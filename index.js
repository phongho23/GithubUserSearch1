'use strict';

const searchURL = 'https://api.github.com/users/';
//'https://api.github.com/users/USERNAME/repos';

function getUser(searchUser) {
    const url = searchURL + searchUser + '/repos';

    const options = {
        headers: new Headers({
            "accept": '/repos?accept=application/vnd.github.v3+json'
        })
    };

    fetch(url)
        .then(response => response.json())
        .then(responseJson => repoCreate(responseJson));
}

function repoCreate(responseJson){
    let repoArray = [];
    for (let i = 0; i < responseJson.length; i++) {
        repoArray.push(responseJson[i].name + " " + `<a href="${responseJson[i].html_url}">Link</a>`);
    };
    displayResults(repoArray);
}

function displayResults(repoArray) {
    console.log("display results ran");
    $(".results").html("");
    repoArray.forEach(repItem => {
        $(".results").append(`<p>${repItem}</p>`)
    });
    $(".results").removeClass("hidden");
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchUser = $('#js-search-user').val();
        getUser(searchUser);
    });
}

$(watchForm);