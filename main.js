const btn = async () => {
  if (document.querySelector(".el") != null) {
    document.querySelectorAll(".el").forEach((e) => e.remove());
    document.querySelector(".first").innerHTML = "";
    
  }
  try {
    let s = document.querySelector("#search").value;
    const response = await fetch(
      `http://www.omdbapi.com/?s=${s}&apikey=3a3b67e6`
    );
    const data = await response.json();

    for (i in data.Search) {
      let div = document.createElement("div");
      div.innerHTML = `<div 
        style='background:url(${data.Search[i].Poster}) no-repeat ;background-size:auto;
        width:300px;height:300px;font-size:20px;margin-left:10px' 
        class="el" > </div>
        <div class="card1" style="width: 300px;height: 50px;border: 1px solid gray;;background:lightgray;padding-top:20px;margin-left:10px">${data.Search[i].Title}</div>
        <div class="card2" style="width: 300px;height: 75px;border: 1px solid gray;background:white;padding-top:20px;margin-left:10px">${data.Search[i].Type}<br><br>${data.Search[i].Year}</div>
        <button class="btn${i}" 
        style="width: 300px;height: 50px;cursor: pointer;
        border: 1px solid;padding-top:5px;border-radius:0 0 5px 5px;
        background:green;color:white;font-size:20px;
        margin-bottom:20px;margin-left:10px">More details</button>
        `;

      document.querySelector(".first").appendChild(div);
    }
    if (data.Search != undefined) {
      for (let k = 0; k < data.Search.length; k++) {
        const response = await fetch(`http://www.omdbapi.com/?i=${data.Search[k].imdbID}&apikey=eeb56d4b`);
        const data2 = await response.json();
        document.querySelector(`.btn${k}`).addEventListener("click", function () {
          let q = document.createElement("div");
          let scr = window.scrollY;
          q.innerHTML = `<div class="container" style="width:800px;height:600px;background-color:white;
          text-align:center;display: flex;flex-wrap: wrap;text-align: center;justify-content: space-around;
          position:absolute;top:${scr + 300}px;left:50%;transform: translate(-50%, -50%);border:1px solid grey;margin:2px ">
          <div class="left" style="background: center/contain url(${data.Search[k].Poster}) no-repeat ;width: 44%;height: 98%;"></div>
          <div class="right" style="width: 52%;height: 98%;">
  <h1 style="background-color: darkgray;text-align: center;margin-top: 50px;" class="title">${data.Search[k].Title}</h1>
  <p>
      <span style="padding-right: 20px;" class="rated">${data2.Rated} </span>
      <span style="padding-right: 20px;" class="year">${data2.Year}  </span>
      <span style="padding-right: 20px;" class="genre">${data2.Genre} </span>
  </p><br>
  <p class="Plot"> ${data2.Plot}</p>
  <p><b>Wtitten by : </b><span class="writer"> ${data2.Writer} </span></p>
  <p><b>Directed by : </b><span class="dir">${data2.Director}</span></p>
  <p><b>Starring : </b><span class="act"> ${data2.Actors} </span></p>
  <p><b>BoxOffice : </b><span class="box"> ${data2.BoxOffice}</span></p>
  <p><b>Awards : </b><span class="aw"> ${data2.Awards} </span></p>
         <p><b>Ratings : </b>
            <span class="rate"><br>
              
            </span>
        </p>
      </div>
    </div>`
          document.querySelector(".first").appendChild(q);

          if (data2.Ratings.length > 0) {
            document.querySelector('.rate').innerHTML += `${data2.Ratings[0].Source} ${data2.Ratings[0].Value}<br>`
          }
          console.log(data2);
          if (data2.Ratings.length > 1) {
            document.querySelector('.rate').innerHTML += `${data2.Ratings[1].Source} ${data2.Ratings[1].Value}<br>`
          }
          console.log(data2);
          if (data2.Ratings.length > 2) {
            document.querySelector('.rate').innerHTML += `${data2.Ratings[2].Source} ${data2.Ratings[2].Value}`
          }

        });
      }
    }
  } catch (err) {
    return console.log(err);
  }
};


document.querySelector('html').addEventListener('click', function (e) {
  if (e.target.tagName == 'HTML' || e.target.tagName == 'BODY' || e.target.className == 'el' && document.querySelector(".container")) {
    document.querySelector(".container").remove();
  }
});