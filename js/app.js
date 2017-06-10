console.log("works");

//https://www.reddit.com/r/EarthPorn.json

function reqListener () {
  //console.log(this.responseText);
  var response = JSON.parse(this.responseText);
  console.log(response.data.children.length);
  // console.log(response.data.children[0].data);
  //console.log(response.data.children[2].data);
  // console.log(response.data.children[3].data.url);
  //var pic = document.getElementById("pic1");
  //pic.src = "https://i.redd.it/tl6atbmxjp2z.jpg";
  //pic.src = response.data.children[3].data.url;

  //var picContainer = ["pic1", "pic2", "pic3", "pic4"];
  var lenPics = response.data.children.length;

  var picCounter = 0;
  for (var i = 0; i < lenPics; i++){
    if (response.data.children[i].kind === "t3"){
      //console.log("match",response.data.children[i].kind);
      if (response.data.children[i].data.post_hint === "image"){

        (function(){
          console.log(response.data.children[i].data.id);
          var elementContainer = document.createElement("div");
          elementContainer.className = "viewContainer";

          var mainPic = document.createElement("img");
          mainPic.className = "pics";
          mainPic.src = response.data.children[i].data.url;
          elementContainer.appendChild(mainPic);

          var mainHeading = document.createElement("h2");
          mainHeading.innerHTML = "Count:"+picCounter+" "+response.data.children[i].data.title;
          picCounter++;
          elementContainer.appendChild(mainHeading);


          console.log(elementContainer);
          //var picpic = document.getElementById(picContainer.pop());
          //console.log("popping ", picpic);
          //picpic.src = response.data.children[i].data.url;
          //console.log("siblingchild ",picpic.nextSibling.nextSibling.childNodes);
          //picpic.nextSibling.nextSibling.childNodes[1].innerHTML = response.data.children[i].data.title;

          var cReqId = response.data.children[i].data.id;
          console.log("cReqId is", cReqId);
          function commentListener (){
            //console.log("iife ", picCounter);
            var cResponse = JSON.parse(this.responseText);
            //console.log("cResp ", cResponse);
            //console.log(cResponse[1].data.children[0].data.body);
            var subHeading = document.createElement("h4");


            var comment = "";
            try {
              comment = cResponse[1].data.children[0].data.body;
            }catch(err){
              comment = "trendy subheading: firstpost!";
            }
            subHeading.innerHTML = comment;

            // if (comment){
            //   subHeading.innerHTML = cResponse[1].data.children[0].data.body;
            // }
            // else{
            //   subHeading.innerHTML = "trendy subheading: first post!";
            // }
            elementContainer.appendChild(subHeading);

            //console.log("subheading should be:", cResponse[1].data.children[0].data.body);
            //picpic.nextSibling.nextSibling.childNodes[3].innerHTML = cResponse[1].data.children[0].data.body;
          }

                    overallContainer.appendChild(elementContainer);

          var cReq = new XMLHttpRequest();
          cReq.addEventListener("load", commentListener);
          //cReq.open("GET", "https://www.reddit.com/r/EarthPorn/comments/6gf6ou.json");
          console.log(`https://www.reddit.com/r/EarthPorn/comments/${cReqId}.json`);
          cReq.open("GET", `https://www.reddit.com/r/EarthPorn/comments/${cReqId}.json`);
          cReq.send();

        })();

        //picpic.nextSibling.nextSibling.childNodes[3].innerHTML = "the subtitle is great tooo";
      }
    }
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://www.reddit.com/r/EarthPorn.json");
oReq.send();