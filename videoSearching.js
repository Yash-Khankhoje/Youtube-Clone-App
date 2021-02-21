let apiKey = 'AIzaSyA9i2UpeidnqfbkRsJFXyFiMQMN_M32uZI';
let videos = document.getElementById('videos');

function Executer(){
    videoName = document.getElementById('search').value;                                                //To get value entered in the input field.

    videoSearch(apiKey, videoName, 30);

    
}

function videoSearch(key, search, maxResults){
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9i2UpeidnqfbkRsJFXyFiMQMN_M32uZI&type=video&part=snippet&maxResults='+maxResults+'&q='+search,function(data){}) //Fetching data from URL.
    .then( async response=>{
        let data = await response.json()
        console.log(data);
        data.items.forEach(item => {
            videos.innerHTML = `
            <iframe width='420'height='315' src='http://www.youtube.com/embed/${item.id.videoId}' frameborder='0' allowfullscreen></iframe>
            `           
        });
    })
    .catch(err=>{
        console.log(err)
    })

}