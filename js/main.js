let key = "c90d69bab6e84e39ac36904e19c7fbdd";
let url =
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c90d69bab6e84e39ac36904e19c7fbdd";
// https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=c90d69bab6e84e39ac36904e19c7fbdd
const getNews = async function(url) {
  let raw = await fetch(url);
  let data = await raw.json();
  let mainRow = document.getElementById("cards");
  let miniRow = document.getElementById("headlines");

  if (data.status === "ok") {
    console.log(data.articles);

    let summaries = data.articles.map(function(item) {
      return (item = `
      <a href="${
        item.url
      }" target="_blank"  class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <strong><h3 class="mb-1">${item.title}</h3></strong>
        <small>${item.publishedAt.slice(0, 10)}</small>
      </div>
      <p class="mb-1">${item.description}</p>
      <!--<small>${item.author}</small>-->
    </a>`);
    });

    let headlines = data.articles.map(function(item) {
      if (!item.urlToImage) {
        item.urlToImage =
          "https://dummyimage.com/300x200/000/010105&text=No+image+provided.";
      }
      return (item = `<div class="col-4">
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
    console.log(headlines);

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
