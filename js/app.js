console.log("works");

//https://www.reddit.com/r/EarthPorn.json

function reqListener () {
  //console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  // console.log(response.data.children[0].data);
   console.log(response.data.children[2].data);
  // console.log(response.data.children[3].data.url);
  //var pic = document.getElementById("pic1");
  //pic.src = "https://i.redd.it/tl6atbmxjp2z.jpg";
  //pic.src = response.data.children[3].data.url;

  var picContainer = ["pic1", "pic2", "pic3", "pic4"];
  var picCounter = 0;
  for (var i = 0; picCounter < 4; i++){
    if (response.data.children[i].kind === "t3"){
      console.log("match",response.data.children[i].kind);
      if (response.data.children[i].data.post_hint === "image"){
        console.log(response.data.children[i].data.url);
        var picpic = document.getElementById(picContainer.pop());
        console.log("popping ", picpic);
        picpic.src = response.data.children[i].data.url;
        console.log("siblingchild ",picpic.nextSibling.nextSibling.childNodes);
        picpic.nextSibling.nextSibling.childNodes[1].innerHTML = response.data.children[i].data.title;
        picpic.nextSibling.nextSibling.childNodes[3].innerHTML = "the subtitle is great tooo";
        picCounter++;
      }
    }
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://www.reddit.com/r/EarthPorn.json");
oReq.send();