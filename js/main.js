$(document).ready(function() {
  /* our pretzel and default source and url */
  let pretzels = "c90d69bab6e84e39ac36904e19c7fbdd";
  let newsSource = "sources=bbc-news";
  let url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;

  /* getting the news from the api with a url parameter */
  const getNews = async function(url) {
    let raw = await fetch(url);
    let data = await raw.json();
    let newsCards = document.getElementById("headlines");

    // dealing with the current date
    let currentDate = new Date();
    let currentTime = currentDate.getTime();
    //console.log(currentTime + " is date")

    if (data.status === "ok") {
      //console.log(data.articles);

      let summaries = data.articles.map(function(item) {
        let articleDate = new Date(item.publishedAt);
        let articleTime = articleDate.getTime();
        let hoursAgo = calculateHoursAgo(currentTime, articleTime);

        return (item = `
        <div class="newsCard">
            <div class="newsCardText">
              <a href="${item.url}" target="_blank" class="headlineLink">
                <h3 class="cardTextHeadline">
                ${item.title}
                </h3>
              </a>
              <p>
              ${item.description}
              </p>
              <div class="thirdRow">
              <p class="cardTimeStamp">${hoursAgo}</p>
              <span class="shareContainer">
              <a href="mailto:?subject=Check out this article&amp;body=${
                item.url
              }" title="Send in E-mail" class="shareEmail"><i class="far fa-envelope"></i></a>
              <a class="shareTwitter" href="https://twitter.com/intent/tweet?text=Check out this article ${
                item.url
              }" target="_blank" title="Tweet This"><i class="fab fa-twitter"></i></a>
            </span>
            </div>
            </div>
            <div class="newsCardImage d-none d-lg-block d-md-block">
              <img
                src="${item.urlToImage}"
                alt="${item.title}"
              />
            </div>
          </div>`);
      });

      summaries.forEach(element => {
        newsCards.innerHTML += element;
      });
    } else {
      console.log("There was an error.");
    }
    //console.log(data);

    /* calculating post time here */
    function calculateHoursAgo(currentTime, articleTime) {
      let hourNumber = Math.round((currentTime - articleTime) / 3600000);

      if (hourNumber < 1) {
        let minuteNumber = Math.round((currentTime - articleTime) / 60000);
        if (minuteNumber === 1) {
          return "1 minute ago";
        } else {
          return `${minuteNumber} minutes ago`;
        }
      } else if (hourNumber === 1) {
        return "1 hour ago";
      } else {
        return `${hourNumber} hours ago`;
      }
    }
  };

  getNews(url);

  /* sidebar code to show or hide the sidebar */

  $("#menuButton").click(function() {
    //console.log("button clicked");
    $("#mySideBar").toggleClass("sidebarActive");
  });

  /* sidebar code to hide the sidebar when clicked on somewhere other than the sidebar or the hamburger icon */

  $(document).click(function(e) {
    let sideMenuButton = $("#hamburgerMenu");
    let sideBarItemClass = $(e.target).attr("class");
    let sideBar = $("#mySideBar");
    let sideMenuButtonID = sideMenuButton[0].id;
    if (sideBarItemClass) {
      if (
        !sideBarItemClass.includes("sideBarItem") &&
        sideMenuButtonID !== e.target.id
      ) {
        //console.log("if ran");
        sideBar.removeClass("sidebarActive");
      }
    } else {
      //console.log("no class");
    }
  });

  /* sidebar code to change the active button, and the displayed news source */

  $(".sideBarItem").click(function(e) {
    $("#headlines").html("");
    let topInfoIcon = $("#topInfoSectionIcon");
    let topInfoText = $("#topInfoSectionText");

    $("#mySideBar .listItem")
      .find(".listItemLinkActive")
      .removeClass("listItemLinkActive")
      .addClass("listItemLink");

    if ($(this).hasClass("listItemLinkActive")) {
      $(this).removeClass("listItemLinkActive");
      $(this).addClass("listItemLink");
    } else {
      $(this).removeClass("listItemLink");
      $(this).addClass("listItemLinkActive");
    }

    let clickedSource = e.target.innerHTML;
    if (clickedSource === "World") {
      newsSource = "sources=bbc-news";
      topInfoText.text("World");
      topInfoIcon.attr("class", "fas fa-globe-americas");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Sports") {
      newsSource = "sources=bbc-sport";
      topInfoText.text("Sports");
      topInfoIcon.attr("class", "fas fa-basketball-ball");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Business") {
      newsSource = "sources=the-wall-street-journal";
      topInfoText.text("Business");
      topInfoIcon.attr("class", "fas fa-chart-bar");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Tech") {
      newsSource = "sources=wired";
      topInfoText.text("Tech");
      topInfoIcon.attr("class", "fas fa-microchip");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Entertainment") {
      newsSource = "sources=entertainment-weekly";
      topInfoText.text("Entertainment");
      topInfoIcon.attr("class", "fas fa-theater-masks");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Health") {
      newsSource = "sources=medical-news-today";
      topInfoText.text("Health");
      topInfoIcon.attr("class", "fas fa-heartbeat");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else if (clickedSource === "Local") {
      newsSource = "sources=die-zeit";
      topInfoText.text("Local");
      topInfoIcon.attr("class", "fas fa-map-marker-alt");
      url = `https://newsapi.org/v2/top-headlines?${newsSource}&apiKey=${pretzels}`;
      getNews(url);
    } else {
      console.log("Something is wrong.");
    }
  });

  $(window)
    .on("resize", function() {
      let windowWidth = $(window).width();
      //console.log(windowWidth);

      if (windowWidth < 992) {
        //console.log("if resize");
        $("#mySideBar").hide();
      } else if (windowWidth >= 992) {
        //console.log("else resize");
        $("#mySideBar").show();
      }
    })
    .resize();
});

/* this is a sample object
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
