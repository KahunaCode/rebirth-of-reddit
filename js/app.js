console.log("works");

//https://www.reddit.com/r/EarthPorn.json

function reqListener () {
  //console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  console.log(response.data.children.length);
  // console.log(response.data.children[0].data);
  // console.log(response.data.children[2].data);
  // console.log(response.data.children[3].data.url);
  var lenPics = response.data.children.length;

  var picCounter = 0;
  for (var i = 0; i < lenPics; i++){
    if (response.data.children[i].kind === "t3"){
      //console.log("match",response.data.children[i].kind);
      if (response.data.children[i].data.post_hint === "image"){

        (function(){
          console.log(response.data.children[i].data.id);
          var aTag = document.createElement("a");
          aTag.setAttribute("href", response.data.children[i].data.url);

          var elementContainer = document.createElement("div");

          console.log(response.data.children[i].data.url);
          elementContainer.className = "viewContainer";

          var mainPic = document.createElement("img");
          mainPic.className = "pics";
          mainPic.src = response.data.children[i].data.url;
          elementContainer.appendChild(mainPic);

          var mainHeading = document.createElement("h2");
          //mainHeading.innerHTML = "Count:"+picCounter+" "+response.data.children[i].data.title;
          mainHeading.innerHTML = response.data.children[i].data.title;
          picCounter++;
          elementContainer.appendChild(mainHeading);

          //console.log(elementContainer);

          var cReqId = response.data.children[i].data.id;
          //console.log("cReqId is", cReqId);
          function commentListener (){
            //console.log("iife ", picCounter);
            var cResponse = JSON.parse(this.responseText);
            //console.log("cResp ", cResponse);
            //console.log(cResponse[1].data.children[0].data.body);
            var subHeading = document.createElement("h4");

            //try catch because sometimes there aren't comments for a subtitle
            var comment = "";
            try {
              comment = cResponse[1].data.children[0].data.body;
            }catch(err){
              comment = "trendy subheading: firstpost!";
            }
            subHeading.innerHTML = comment;
            elementContainer.appendChild(subHeading);

            //console.log("subheading should be:", cResponse[1].data.children[0].data.body);
          }

          aTag.appendChild(elementContainer);
          overallContainer.appendChild(aTag);

          var cReq = new XMLHttpRequest();
          cReq.addEventListener("load", commentListener);
          //cReq.open("GET", "https://www.reddit.com/r/EarthPorn/comments/6gf6ou.json");
          //console.log(`https://www.reddit.com/r/EarthPorn/comments/${cReqId}.json`);
          cReq.open("GET", `https://www.reddit.com/r/EarthPorn/comments/${cReqId}.json`);
          cReq.send();

        })();

      }
    }
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://www.reddit.com/r/EarthPorn.json");
oReq.send();