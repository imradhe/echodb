 addEventListener("keydown",function(e){
              if(e.ctrlKey && e.keyCode == "70"){
                   e.preventDefault()
                   document.querySelector("#search").focus()
                 }
              if(e.keyCode == "13"){
                  e.preventDefault()
                  document.querySelector("#searchBtn").click()
              }
          })

          var shareUrl = document.querySelector("#shareUrl") 
          var copyBtn = document.querySelector("#copyBtn")
          var whatsapp = document.querySelector(".bi-whatsapp")
          var facebook = document.querySelector(".bi-facebook")
          var twitter = document.querySelector(".bi-twitter")
          var linkedin = document.querySelector(".bi-linkedin")
              var getUrl =  window.location.href
              shareUrl.value = getUrl

              whatsapp.href = "https://wa.me/?text=Check out Echo DB. *Echo DB* is a web app to search and listen to any song you like on any platform you love. Search, Listen and Enjoy! "+getUrl
                facebook.href = "https://www.facebook.com/sharer/sharer.php?u="+getUrl+"&quote=Check out Echo DB. Echo DB is a web app to search and listen to any song you like on any platform you love. Search, Listen and Enjoy!"
                twitter.href = "https://twitter.com/intent/tweet?text=Check out Echo DB. Echo DB is a web app to search and listen to any song you like on any platform you love. Search, Listen and Enjoy! by @beinghumanmuzic&url="+getUrl
                linkedin.href = "https://www.linkedin.com/cws/share?url="+getUrl
                copyBtn.addEventListener('click',function(){
                    shareUrl.select()
                    shareUrl.setSelectionRange(0, 99999)
                    document.execCommand("copy")               
                    copyBtn.innerHTML = "Copied!"
                    setTimeout(function(){ copyBtn.innerHTML="copy" }, 1000)
                })
            
            //ScrollTop
            var scrollTopbtn = $('#scrollTop');	

                $(window).scroll(function() {
                if ($(window).scrollTop() > 300) {
                    scrollTopbtn.addClass('show');
                } else {
                    scrollTopbtn.removeClass('show');
                }
                });

                scrollTopbtn.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({scrollTop:0}, '300');
                });

function updateURL(songName = "") {
    return `https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=getSongs&q=${songName}&apikey=f90cd35582c176dbcfd3ecebcc227390&has_lyrics=1`;
  }
  
  
  let submitButton = document.querySelector("#searchBtn");
  
  submitButton.onclick = function () {
    //getting song name and replacing space with %20
    let song_name = document.querySelector("#search").value;
    song_name = song_name.replace(/ /g, "%20");
  
  
    // getting new url
    let newURL = updateURL(song_name);
    // console.log(newURL);
  
    updateScript(newURL);
  
  };
  
  function updateScript(url) {
    let newScript = document.createElement("script");
    newScript.src = url;
    newScript.setAttribute("id", "head-script");
  
    let oldScript = document.getElementById("head-script");
    let head = document.getElementsByTagName("head")[0];
  
    if (oldScript === null) {
      head.appendChild(newScript);
    } else {
      head.replaceChild(newScript, oldScript);
    }
  }

  
  function getSongs(object) {
    if (object.message.header.status_code === 404) {
      document.querySelector(".results").innerHTML = "Song not found";
    } else {

      document.querySelector(".results").innerHTML ='<thead><tr> <th scope="col">#</th><th scope="col">Song</th><th scope="col">Artist</th><th scope="col">Lyrics</th></tr></thead>';
      var i = 0;
      object.message.body.track_list.forEach(element => {
        document.querySelector(".results").innerHTML += '<tr><th scope="row">'+(i+1)+'</th><td>'+element.track.track_name+'</td><td>'+element.track.artist_name+'</td><td><button type="button" data-bs-toggle="modal" data-bs-target="#track'+(i+1)+'" class="btn btn-danger">Lyrics</button></td></tr>';        
        i++;
      });
      i =0;
      document.querySelector(".modals").innerHTML = ""
      object.message.body.track_list.forEach(element => {
        document.querySelector(".modals").innerHTML += '<div class="modal fade" id="track'+(i+1)+'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Listen Now</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><iframe loading="lazy" width="100%" height="300" src="'+element.track.track_share_url.substring(0,(element.track.track_share_url.length - 75))+'/embed?theme=light" style="border:none;background:transparent;" width="100%" height="380" border=0></iframe></div></div></div></div>';        
        i++;
      });
    }
  }