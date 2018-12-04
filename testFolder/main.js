$(document).ready(function () {
  // Handler for .ready() called.

  let key = "c90d69bab6e84e39ac36904e19c7fbdd";
  let url =
    "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c90d69bab6e84e39ac36904e19c7fbdd";
  // https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c90d69bab6e84e39ac36904e19c7fbdd
  const getNews = async function (url) {
    let raw = await fetch(url);
    let data = await raw.json();
    let mainRow = document.getElementById("cards");
    let miniRow = document.getElementById("headlines");

    // dealing with the date
    let currentDate = new Date();
    let currentTime = currentDate.getTime()
    //console.log(currentTime + " is date")

    if (data.status === "ok") {
      //console.log(data.articles);

      let summaries = data.articles.map(function (item) {
        let articleDate = new Date(item.publishedAt)
        let articleTime = articleDate.getTime()
        let hoursAgo = calculateHoursAgo(currentTime, articleTime)
        //console.log(hoursAgo)
        return (item = `
        <div class="newsHeadlineCard">
          <div class="newsHeadlineCardText">
            <a href="#${item.url}">
              <h3 class="CardTextHeadine">${item.title}</h3>
            </a>
            <p>${hoursAgo}</p>
          </div>
        </div>
        `);
      });

      let headlines = data.articles.map(function (item) {
        if (!item.urlToImage) {
          item.urlToImage =
            "https://dummyimage.com/300x200/000/010105&text=No+image+provided.";
        }
        return (item = `<div class="col-4" id="${item.url}">
                        <div class="card mb-4 shadow-sm">
                          <img
                            class="card-img-top"
                            src="${item.urlToImage}"
                            alt="Card image cap"
                            height="200" width="auto"
                          />
                        <div class="card-body">
                          <strong class="d-inline-block mb-2 text-primary">${
                            item.author
                          }</strong>
                          <h3 class="mb-0">
                            <p class="text-dark">${item.title}</p>
                          </h3>
                        <div class="mb-1 text-muted">${item.publishedAt.slice(
                          0,
                          10
                        )}</div>
                          <p class="card-text">
                          ${item.description}
                          </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="${
                              item.url
                            }" target="_blank">Continue reading</a>
                            <small class="text-muted"></small>
                        </div>
                        </div>
                      </div>
                    </div>`);
      });
      //console.log(headlines);

      headlines.forEach(element => {
        mainRow.innerHTML += element;
      });

      summaries.forEach(element => {
        miniRow.innerHTML += element;
      });
    } else {
      console.log("There was an error.");
    }
    //console.log(data);

    function calculateHoursAgo(currentTime, articleTime) {

      let hourNumber = Math.round((currentTime - articleTime) / 3600000);

      if (hourNumber < 1) {
        let minuteNumber = Math.round((currentTime - articleTime) / 60000)
        if (minuteNumber === 1) {
          return "1 minute ago"
        } else {
          return `${minuteNumber} minutes ago`
        }
      } else if (hourNumber === 1) {
        return "1 hour ago"
      } else {
        return `${hourNumber} hours ago`
      }

    }


  };

  getNews(url);

  /*
0:
author: "BBC News"
content: "Media caption Footage of the collision was posted by the Ukrainian interior minister Russian President Vladimir Putin has accused Ukraine's leader, Petro Poroshenko, of trying to boost his ratings ahead of 2019 elections with a naval confrontation off Crimea.… [+298 chars]"
description: "Russia's president accuses Ukraine of orchestrating a naval confrontation off Crimea."
publishedAt: "2018-11-28T12:31:25Z"
source: {id: "bbc-news", name: "BBC News"}
title: "Sea clash staged by Ukraine, says Putin"
url: "http://www.bbc.co.uk/news/world-europe-46370619"
urlToImage: "https://ichef.bbci.co.uk/images/ic/1024x576/p06swhnz.jpg"
*/

  //testing the hamburger menu button, very broken atm
  /*
function openSideBar() {
  let sideBar = document.getElementById("mySideBar");
  console.log("button clicked");
  if (sideBar.style.display === "none") {
    console.log("if runs");
    sideBar.style.display = "block";
  } else {
    console.log("else runs");
    sideBar.style.display = "none";
  }
}*/
  $("#menuButton").click(function () {
    console.log("button clicked");
    $("#mySideBar").toggle();
  });

  $(document).click(function (e) {
    let sideMenuButton = $("#hamburgerMenu");
    console.log(e.target.id);
    let sideBar = $("#mySideBar");
    console.log(sideBar[0].id);
    let sideBarID = sideBar[0].id;
    let sideMenuButtonID = sideMenuButton[0].id;

    if (sideBarID !== e.target.id && sideMenuButtonID !== e.target.id) {
      console.log("if ran");
      sideBar.hide();
    }
  });
});