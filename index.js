let container = document.querySelector(".container");
let buttn = document.querySelector(".button");

let dataFromApi;
// const clickHereButton = ["Click here to see photo"];
// const header = ["Nasa Photo of The Day"];

function getNasaData() {
  let apiKey = "UdzVuQvaDTOgesMAzW8G8bIg1zOzucCaNoaBp3aL";

  // Create date elements for today,yesterday and the day before
  let today = new Date();
  let yesterday = new Date();
  let twoDaysAgo = new Date();

  yesterday.setDate(today.getDate() - 1);
  twoDaysAgo.setDate(today.getDate() - 2);
  // Format dates as YYYY-MM-DD
  let formatDate = (date) => date.toISOString().split("T")[0];

  let dates = [
    formatDate(today),
    formatDate(yesterday),
    formatDate(twoDaysAgo),
  ];
  // Fetch APOD for each date
  let requests = dates.map((date) =>
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
      //   fetch(
      //     "https://api.nasa.gov/planetary/apod?api_key=UdzVuQvaDTOgesMAzW8G8bIg1zOzucCaNoaBp3aL"
      //   )
      //this was the original fetch
      .then((response) => response.json())
  );

  Promise.all(requests)

    .then((data) => {
      //   dataFromApi = data;
      //old code prior to date change
      // console.log("NASA Data:", dataFromApi);
      seeData(data);
      // photoButtn();
    })

    .catch((error) => console.error("Error:", error));
}
// getNasaData()

//create a function called seeData

function seeData(dataFromApi) {
  container.innerHTML = "";
  // The inner HTML clears previous content when the button is pressed repeatedly
  // container.classList.add("visible");

  dataFromApi.forEach((item) => {
    // creating div containers
    let cardDiv = document.createElement("div");

    cardDiv.style.padding = "15px";
    cardDiv.style.textAlign = "center";
    cardDiv.style.border = "5px solid darkcyan";
    cardDiv.style.borderRadius = "10px";
    cardDiv.style.backgroundColor = "#f0f8ff";
    cardDiv.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.2)";

    // create title element

    let title = document.createElement("h1");
    title.textContent = item.title;
    title.style.color = "darkcyan";
    cardDiv.appendChild(title);

    // console.log(cardDiv, "cardDiv");

    // create date element

    let date = document.createElement("p");
    date.textContent = `Date: ${item.date}`;
    cardDiv.appendChild(date);

    // console.log(cardDiv, "cardDiv");

    //check if the media type is an image or video

    if (item.media_type === "image") {
      // Create image element
      let image = document.createElement("img");
      image.src = item.url;
      image.alt = item.title;
      image.style.width = "300px";
      image.style.margin = "10px";
      image.style.borderRadius = "7px";
      image.style.padding = "7px";
      image.style.borderColor = "darkcyan";
      cardDiv.appendChild(image);
    } else if (item.media_type === "video") {
      let videoFrame = document.createElement("iframe");
      videoFrame.src = item.url;
      videoFrame.style.width = "100%";
      videoFrame.style.height = "315px";
      //standard youTube embed height
      videoFrame.style.borderRadius = "7px";
      videoFrame.style.border = "2px solid darkcyan";
      videoFrame.allowFullscreen = true;
      cardDiv.appendChild(videoFrame);
    }

    // Create explanation text
    let explanation = document.createElement("p");
    explanation.textContent = item.explanation;
    explanation.style.textAlign = "justify";
    cardDiv.appendChild(explanation);

    // append to container

    container.appendChild(cardDiv);
    console.log(container, "container");
  });
  container.classList.add("visible");
  //to ensure container is shown
}
//event listener for button

buttn.addEventListener("click", getNasaData);

// getNasaData();
// photoButtn()
