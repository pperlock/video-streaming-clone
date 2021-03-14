// import any modules used by the server
const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Middleware used to avoid CORS issues
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

//use .json to solve issues between json and text formats
app.use(express.json());

//import the all data from the data file
const mainVideo = require('./data.json');
const users = require('./users.json');

//REQUEST: username
//PARAMS: :id : id of the video to be returned
//RETURN: the requested video in json format
app.get('/user/:username', (req, res)=>{
    
    //find the video associated with the requested id
    const requestedUser=users.find(user=> user.username===req.params.username);

    //return the video associated with the requested id
    return res.json(requestedUser);
});

//REQUEST: get route to return an array of the truncated description of the videos
//RETURN: an array of videos
app.route('/videos')
    .get((_req,res)=>{
        let sideVideos = [{
            id:"",
            title:"",
            channel:"",
            image:""
        }]
        // create the sideVideos arrray from the data file
        sideVideos = mainVideo.map((video,i) => sideVideos[i] = {id:video.id, title:video.title, channel:video.channel, image:video.image})
        
        // return the videos
        res.json(sideVideos);
    })

    //REQUEST: post route to add a new video to the data store
    //RETURN: the added video in json format
    .post((req,res)=>{
        
        //the body of the user request should contain the following information
        const {title, channel, image, description, views, likes, duration,video} = req.body;
        
        //create a newVideo object from the body request information
        const newVideo={
            id:uuidv4(),
            title,
            channel,
            image,
            description,
            views,
            likes,
            duration,
            video,
            timestamp:Date.now(),
            comments:[]
        }
    
        //add the new video to the data array
        mainVideo.push(newVideo);

        //format the json object to a string 
        data = JSON.stringify(mainVideo,null,2);
        
        //write the formated object to the data store
        fs.writeFile('./data.json', data, ()=>{
            console.log("Data written to server");
        });

        //return the video to the user
        res.json(newVideo);
    })

//REQUEST: get route to access a specific video
//PARAMS: :id : id of the video to be returned
//RETURN: the requested video in json format
app.get('/videos/:id', (req,res)=>{
    
    //find the video associated with the requested id
    const requestedVideo=mainVideo.find(video=> video.id===req.params.id);

    //return the video associated with the requested id
    return requestedVideo ? res.json(requestedVideo): res.send("failed");
});


//REQUEST: put route to update the number of likes for a video
//PARAMS: :videoId : id of the video to be modified
//RETURN: the updated video in json format

app.put('/videos/:videoId/likes', (req, res)=>{

    //find the video associated with the requested id
    const requestedVideo=mainVideo.find(video=> video.id===req.params.videoId)
    
    //remove the commas from the likes string
    formattedLikes = requestedVideo.likes.split(",").join("");
    
    //convert the formatted string into a number and update
    videoLikes = Number(formattedLikes) + 1;

    //convert the updatedNumber to the xxx,xxx,xxx number format
    updatedLikes = videoLikes.toLocaleString('en-US'); 

    //set the likes for the appropriate video to the updated string
    requestedVideo.likes = updatedLikes;

    //return the updated video
    res.json(requestedVideo)

    //format the json object to a string 
    data = JSON.stringify(mainVideo,null,2);
    
    //write the formated object to the data store
    fs.writeFile('./data.json', data, ()=>{
        console.log("Data written to server");
    });
})

//REQUEST: post route to add a new comment for a video
//PARAMS: :id : id of the video to be updated
//RETURN: the added comment in json format
app.post('/videos/:id/comments', (req,res)=>{
    
    //the body of the user request should contain the following information
    const {name, comment, userId, avatar} = req.body;

    //create a newComment object from the body request information
    const newComment = {        
        userId,
        avatar,
        id: uuidv4(),
        name,
        comment,
        timestamp:Date.now()
    };

    //find the location in the array of the video that should be updated
    const requestedVideoIndex=mainVideo.findIndex(video=> video.id===req.params.id);

    //add the new comment to the comments array for the appropriate video
    mainVideo[requestedVideoIndex].comments.push(newComment)

    //return the new comment
    res.json(newComment);
    
    //format the json object to a string 
    data = JSON.stringify(mainVideo,null,2);
    
    //write the formated object to the data store
    fs.writeFile('./data.json', data, ()=>{
        console.log("Data written to server");
    });
});

//REQUEST: delete request to remove an comment from a specific video
//PARAMS: :videoId=>id of the video to be updated, :commentId=>id of the comment to be removed
//RETURN: the deleted comment in json format
app.delete('/videos/:videoId/comments/:commentId', (req,res)=>{
    
    //find the location in the array of the video that should be updated
    const requestedVideoIndex=mainVideo.findIndex(video=> video.id===req.params.videoId);
    
    //find comment object that needs to be removed
    const deletedComment = mainVideo[requestedVideoIndex].comments.find(comment=>comment.id===req.params.commentId);
    
    //filter that comment out of the comments array of the specified video
    const filteredComments = mainVideo[requestedVideoIndex].comments.filter(comment=>comment.id !== req.params.commentId);

    //set the comments to be the newly filtered comments array
    mainVideo[requestedVideoIndex].comments = filteredComments;

    //return the deleted comment
    res.send(deletedComment);

    //format the json object to a string 
    data = JSON.stringify(mainVideo,null,2);

    //write the formated object to the data store
    fs.writeFile('./data.json', data, ()=>{
        console.log("Data removed from server");
    });

});

//set the server up on port 8080
app.listen(8080, console.log('Listening on port 8080'));

