
            var currentYearSpan = document.querySelector(".currentYear")
            var currentDate = new Date() 
            var currentYear = currentDate.getFullYear()
            currentYearSpan.innerHTML = currentYear
            var searchInput = document.querySelector('#search')
            var searchBtn = document.querySelector("#searchBtn")
            var shortcutsModal = document.querySelector("#shortcutsModal")
            var shareUrl = document.querySelector("#shareUrl") 
            var copyBtn = document.querySelector("#copyBtn")
            var whatsapp = document.querySelector(".bi-whatsapp")
            var facebook = document.querySelector(".bi-facebook")
            var twitter = document.querySelector(".bi-twitter")
            var linkedin = document.querySelector(".bi-linkedin")
                var getUrl =  window.location.href
                shareUrl.value = getUrl
                
            searchBtn.addEventListener('click', function(){                
                    var request = new XMLHttpRequest()
                    var trackCard = document.querySelector(".results")
                    var modals = document.querySelector(".modals")
                    var resultTitle = document.querySelector('.resultTitle')
                    var searchUrl = 'https://itunes.apple.com/search?term='+searchInput.value+"&entity=song&limit=20"
                    request.open('GET', searchUrl, true)
                    request.onload = function () {
                    // Begin accessing JSON data here
                    var data = JSON.parse(this.response)
                        resultTitle.innerHTML = ""
                        trackCard.innerHTML = ""
                        modals.innerHTML = ""

                    if (request.status >= 200 && request.status < 400) {        
                            if(data.resultCount == 0){
                                resultTitle.innerHTML += "<p class='border-none'>No Results found<br>Check the spelling and try again</p>"
                            }else{
                                for (var i = 0; i < data.resultCount; i++) {
                                        trackCard.innerHTML += '<div class="track-card"><div class="content"data-bs-toggle="modal" data-bs-target="#track'+(i+1)+'"><div class="artwork"><img class="artworkImg" height="150px" src="'+data.results[i].artworkUrl100+'" alt="'+data.results[i].trackName+'\'s artwork"><button type="button" data-bs-toggle="modal" data-bs-target="#track'+(i+1)+'" class="btn btn-listen">Listen</button></div><div class="meta"><h5><b class="trackName">'+data.results[i].trackName+'</a></b></h5><h5 class="artistName">'+data.results[i].artistName+'</h5></div></div>'
                                        }
                                for (var i = 0; i < data.resultCount; i++) {
                                        var releaseDateFull = new Date(data.results[i].releaseDate)
                                        var releaseDate = String(releaseDateFull).substr(0,15)
                                        modals.innerHTML += '<div class="modal fade" id="track'+(i+1)+'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Listen Now</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><iframe loading="lazy" width="100%" height="300" src="https://embed.song.link/?url='+data.results[i].trackViewUrl+'&theme=light" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe><div class="accordion" id="details"><div class="accordion-item"> <h2 class="accordion-header" id="headingOne"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+(i+1)+'" aria-expanded="false" aria-controls="collapse'+(i+1)+'"> Song Details</button></h2><div id="collapse'+(i+1)+'" class="accordion-collapse collapse hide" aria-labelledby="headingOne" data-bs-parent="#details"><div class="accordion-body"><table class="table"><tbody><tr><td>Song</td><td>'+data.results[i].trackName+'</td></tr><tr><td>Album</td><td>'+data.results[i].collectionName+'</td></tr><tr><td>Artist</td><td>'+data.results[i].artistName+'</td></tr><tr><td>Genre</td><td>'+data.results[i].primaryGenreName+'</td></tr><tr><td>Release Date</td><td>'+releaseDate+'</td></tr></tbody></table></div></div></div></div></div></div></div></div>'
                                        }  
                                resultTitle.innerHTML += "Results ("+i+")"
                            }                                

                    } else {
                        console.log('error')
                    }
                    }

                    request.send()        
            })

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
            
             addEventListener("keydown",function(e){
                 if(e.ctrlKey && e.keyCode == "70"){
                      e.preventDefault()
                      searchInput.focus()
                    }
                 if(e.keyCode == "13"){
                     e.preventDefault()
                     searchBtn.click()
                 }
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
