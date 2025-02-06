// console.log('lets write js');
let currentsong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>  <img class="invert music-logo" src="playlist/music logo.png" alt="">
                        <div class="info">
                            <div> ${song.replaceAll("%20", " ")}</div>
                        </div>
        
        </li>`  ;
        
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    
    return songs
}
const playMusic = (music, pause = false) => {
    // let audio =new Audio("/songs/" + music)
    currentsong.src = `/${currFolder}/` + music
    if (!pause) {
        currentsong.play()
        play.src = "/playlist/pause song.png"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(music)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardbox = document.querySelector(".cardbox")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs/")) {
            let folder = (e.href.split("/").slice(-2)[1])
            // get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            // console.log(response)
            cardbox.innerHTML = cardbox.innerHTML + `<div data-folder="${folder}" class="card ">
            <div class="play">
                <img src="/playlist/play button.png" alt="">
            </div>
            <img src="/songs/${folder}/cover.jpeg"alt=" "onerror="this.style.display='none';console.clear()">
            <img src="/songs/${folder}/cover.jpg"alt=" "onerror="this.style.display='none';console.clear()">
            <img src="/songs/${folder}/cover.png"alt=" "onerror="this.style.display='none';console.clear()">
            <h2>${folder.replaceAll("%20", " ")}</h2>
            <p>${response.description}</p> 
            <div class="flex download">
            <h3>${response.price}</h3>
            <img id="download" src="Img/download.png" alt="download" onclick="showAlert()">
            </div>
            
            </div>`
           
        }
        const searchInput = document.getElementById('search');
        const cards = document.querySelectorAll('.cardbox .card');

        searchInput.addEventListener('keyup', function () {
            const searchText = searchInput.value.toLowerCase();
            cards.forEach(function (cardbox) {
                const folderName = cardbox.querySelector('h2').textContent.toLowerCase();
                if (folderName.includes(searchText)) {
                    cardbox.style.display = 'block';
                }
                else {
                    cardbox.style.display = 'none';

                }
            });
        });
    }

    //load playlist on click
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        // console.log(e)
        e.addEventListener("click", async item => {
            document.querySelector(".left").style.left = "0"
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })
}

async function main() {
    // get list of all the songs 
    await getsongs("songs/workout")
    playMusic(songs[0], true)

    //display albums on page
    displayAlbums()

    // EventListener to play,next,prev 
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "/playlist/pause song.png"
        }
        else {
            currentsong.pause()
            play.src = "/playlist/play song.png"
        }
    })

    // time update of song 
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (currentsong.currentTime == currentsong.duration) {
            playMusic(songs[index + 1])
        }

    })

    //  seekbar 
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    // addEventListener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    // addEventListener for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-150%"
    })

    // addEventListener to previous song 
    prev.addEventListener("click", () => {
        // console.log("previous clicked")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })
    // addEventListener to next song 
    next.addEventListener("click", () => {
        // console.log("next clicked")

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

}
main()

document.getElementById("search").addEventListener("focus", function () {
    this.classList.add("expanded");
});
document.getElementById("search").addEventListener("blur", function () {
    if (this.value === "") { -
        this.classList.remove("expanded");
    }
}); 
document.getElementsByClassName(".card").addEventListener("focus", function () {
    this.classList.add("hover");
});
document.getElementsByClassName(".card").addEventListener("blur", function () {
    if (this.value === "") { -
        this.classList.remove("hover");
    }
}); 
// document.getElementById('download').addEventListener('click',function(){
//     var zip = new zip-main.zip();
//     var songs = document.querySelectorAll('.songlist li');
//     songs.forEach(function(song,index){
//         zip.file('song_'+ (index+1)+'.text',song.textContent);
//     });
//     zip.generateAsync({type:'blob'}).then(function(content){
//         var link=document.createElement('a');
//         link.href = URL.createObjectURL(content);
//         link.download = 'songs.zip';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     });
// });
function showAlert(){
    alert("this feature is coming sonn");

}