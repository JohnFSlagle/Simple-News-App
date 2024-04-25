const apiKey = process.env.NEWS_API_KEY;
const defaultUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayNews(data.articles);
  } catch (error) {
    console.error("There was an error fetching news:", error);
  }
}

function displayNews(articles) {
  const newsDiv = document.querySelector("#news");
  newsDiv.innerHTML = "";

  for (const article of articles) {
    const articleDiv = document.createElement("div");

    const title = document.createElement("h4");
    title.textContent = article.title;
    articleDiv.appendChild(title);

    const content = document.createElement("p");
    content.textContent = article.content;
    articleDiv.appendChild(content);

    if (article.multimedia && article.multimedia.length > 0) {
      for (const imageInfo of article.multimedia) {
        if (imageInfo.url) {
          const image = document.createElement("img");
          image.src = imageInfo.url;
          image.alt = article.title;
          articleDiv.appendChild(image);
          break;
        }
      }
    } else if (article.urlToImage) {
      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.alt = article.title;
      articleDiv.appendChild(image);
    } else {
      const defaultImage = document.createElement("img");
      defaultImage.src = "default-image.jpg";
      defaultImage.alt = "Default Image";
      articleDiv.appendChild(defaultImage);
    }

    const link = document.createElement("a");
    link.textContent = "Read more";
    link.href = article.url;
    link.target = "_blank";
    articleDiv.appendChild(link);

    newsDiv.appendChild(articleDiv);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchNews(defaultUrl);
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    searchArticles();
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchArticles();
    }
  });
});

function searchArticles() {
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput.trim() !== "") {
    const searchUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;
    fetchNews(searchUrl);
  } else {
    alert("Please enter a search term.");
  }
}
