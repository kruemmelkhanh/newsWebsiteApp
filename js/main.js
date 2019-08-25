$(document).ready(function() {
  /* getting the news from the api with a url parameter */
  const getNews = async function(newsSource) {
    let raw = await fetch(`https://newswebsiteapp.xqwtsz.now.sh/news/${newsSource}`);
    let api = await raw.json();
    let { data } = api
    let newsCards = document.getElementById("headlines");

    // dealing with the current date
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    if (data.status === "ok") {
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
              <p class="cardTextDescription">
              ${item.description}
              </p>
              <div class="thirdRow">
              <p class="cardTimeStamp">${hoursAgo}</p>
              <span class="shareContainer">
              <a href="mailto:?subject=Check out this article&amp;body=${
                item.url
              }" title="Send via E-mail" class="shareEmail"><i class="far fa-envelope"></i></a>
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
                onerror="this.src='./img/missing.png'"
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

  getNews("sources=bbc-news");

  /* sidebar code to show or hide the sidebar */

  $("#menuButton").click(function(e) {
    e.stopPropagation();
    $("#mySideBar").toggleClass("sidebarActive");
  });

  /* sidebar code to hide the sidebar when clicked on somewhere other than the sidebar or the hamburger icon */

  $("body,html").click(function(e) {
    const container = $("#mySideBar");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass("sidebarActive");
    }
  });

  /* sidebar code to change the active list item and the displayed news source */

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

    if (clickedSource.includes("World")) {
      newsSource = "sources=bbc-news";
      topInfoText.text("World");
      topInfoIcon.attr("class", "fas fa-globe-americas");
      getNews(newsSource);
    } else if (clickedSource.includes("Sports")) {
      newsSource = "sources=bbc-sport";
      topInfoText.text("Sports");
      topInfoIcon.attr("class", "fas fa-basketball-ball");
      getNews(newsSource);
    } else if (clickedSource.includes("Business")) {
      newsSource = "sources=the-wall-street-journal";
      topInfoText.text("Business");
      topInfoIcon.attr("class", "fas fa-chart-bar");
      getNews(newsSource);
    } else if (clickedSource.includes("Tech")) {
      newsSource = "sources=wired";
      topInfoText.text("Tech");
      topInfoIcon.attr("class", "fas fa-microchip");
      getNews(newsSource);
    } else if (clickedSource.includes("Entertainment")) {
      newsSource = "sources=entertainment-weekly";
      topInfoText.text("Entertainment");
      topInfoIcon.attr("class", "fas fa-theater-masks");
      getNews(newsSource);
    } else if (clickedSource.includes("Health")) {
      newsSource = "sources=medical-news-today";
      topInfoText.text("Health");
      topInfoIcon.attr("class", "fas fa-heartbeat");
      getNews(newsSource);
    } else if (clickedSource.includes("Local")) {
      newsSource = "sources=die-zeit";
      topInfoText.text("Local");
      topInfoIcon.attr("class", "fas fa-map-marker-alt");
      getNews(newsSource);
    } else {
      console.log("Something is wrong.");
    }
  });

  /* shows and hides sections of the page according to width */

  $(window)
    .on("resize", function() {
      let windowWidth = $(window).width();

      if (windowWidth < 992) {
        $("#mySideBar").removeClass("sidebarActive");
      } else if (windowWidth >= 992) {
        $("#mySideBar").addClass("sidebarActive");
      }
    })
    .resize();
});
