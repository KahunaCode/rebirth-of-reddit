console.log("works");

//https://www.reddit.com/r/EarthPorn.json

function reqListener () {
  //console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  // console.log(response.data.children[0].data);
  // console.log(response.data.children[2].data);
  // console.log(response.data.children[3].data.url);


  for (var i = 0; i < 4; i++){
    if (response.data.children[i].kind === "t3"){
      console.log("match",response.data.children[i].kind);
      if (response.data.children[i].data.post_hint === "image"){
        console.log(response.data.children[i].data.url);
      }
    }
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://www.reddit.com/r/EarthPorn.json");
oReq.send();