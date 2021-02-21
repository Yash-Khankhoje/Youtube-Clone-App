let imageLink;                                                                                          //To load logo image of the channel.
let width;                                                                                              //To set width of the image
let height;                                                                                             //To set height of the image        
let title;                                                                                              //To check Title of the channel
let totalViews;                                                                                         //To count total views
let totalSubscribes;                                                                                    //To count total subscribers
let totalVideos                                                                                         //To count total uploaded videos
let channelId;                                                                                          //To get the channel id entered in the input field
let apiKey = 'AIzaSyATPWSqi5QH--3mvbiSX8NanDEFWE3eD3o';                                                 //Unique API Key

function Executer(){
    channelId = document.getElementById('search').value;                                                //To get value entered in the input field.
    fetch('https://www.googleapis.com/youtube/v3/channels?key=AIzaSyATPWSqi5QH--3mvbiSX8NanDEFWE3eD3o&id='+channelId+'&part=snippet,contentDetails,statistics') //Fetching data from URL.
    .then( async response=>{
        let getData = await response.json()
        console.log(getData);
        fetchData(getData);
    })
    .catch(err=>{
        console.log(err)
    })

    setInterval(function(){
        fetch('https://www.googleapis.com/youtube/v3/channels?key=AIzaSyATPWSqi5QH--3mvbiSX8NanDEFWE3eD3o&id='+channelId+'&part=statistics')
        .then( async response=>{
            let getData = await response.json()
            console.log(getData);
            updateSubscribers(getData);
        })
        .catch(err=>{
            console.log(err)
        })
    })
}
    
function fetchData(getData){
    // To get image and set its display attributes.
    imageLink = getData.items[0].snippet.thumbnails.medium.url;
    width = getData.items[0].snippet.thumbnails.medium.url.width;
    height = getData.items[0].snippet.thumbnails.medium.url.height;
    console.log(imageLink);
    // 
    title = getData.items[0].snippet.title;                                                             //To get Title.
    // 
    totalSubscribes = getData.items[0].statistics.subscriberCount;                                      //To get total subscribers
    // 
    totalViews = getData.items[0].statistics.viewCount;                                                 //To get total views
    // 
    totalVideos = getData.items[0].statistics.videoCount;                                               //To get total videos
    // 

    bindData(imageLink, width, height, title, totalSubscribes, totalViews, totalVideos);
    
}

function bindData(imageLink, width, height, title, totalSubscribes, totalViews, totalVideos){
    let logo = document.getElementById('thumbnail');                                                    //Displaying logo on web page
    logo.setAttribute('src', imageLink);
    logo.setAttribute('width', width);
    logo.setAttribute('height', height);

    channelTitle = document.getElementById('title');
    channelTitle.innerHTML = title

    channelSubscribers = document.getElementById('subscribers');
    channelSubscribers.innerHTML = '<h5>Subscribers</h5>'+totalSubscribes;

    channelViewes = document.getElementById('totalViews');
    channelViewes.innerHTML = '<h5>Views</h5>'+totalViews;

    channelVideos = document.getElementById('totalVideos');
    channelVideos.innerHTML = '<h5>Videos</h5>'+totalVideos;
}

function updateSubscribers(data){
    updatedSubscribers = document.getElementById('subscribers');
    updateSubscribers.innerHTML = '<h5>Subscribers</h5>'+ data.items[0].statistics.subscriberCount;
}


