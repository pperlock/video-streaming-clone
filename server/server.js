// import any modules used by the server
const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

//Middleware used to avoid CORS issues
app.use(cors());

//use .json to solve issues between json and text formats
app.use(express.json());

//import the all data from the data file
const mainVideo = require('./data.json');
const users = require('./users.json');

//REQUEST: username
//PARAMS: :id : id of the video to be returned
//RETURN: the requested video in json format
app.get('/api/user/:username', (req, res)=>{
    
    //find the video associated with the requested id
    const requestedUser=users.find(user=> user.username===req.params.username);

    //return the video associated with the requested id
    return requestedUser ? res.status(200).json(requestedUser) : res.status(401).send("failed");
});

//REQUEST: get route to return an array of the truncated description of the videos
//RETURN: an array of videos
app.route('/api/videos')
    .get((_req,res)=>{

        // create the sideVideos array from the data file
        let sideVideos = mainVideo.map(video => ({id:video.id, title:video.title, channel:video.channel, image:video.image}))
        
        // return the videos
        res.status(200).json(sideVideos);
    })

    //REQUEST: post route to add a new video to the data store
    //RETURN: the added video in json format
    .post((req,res)=>{
        
        //the body of the user request should contain the following information
        const {title, channel, avatar, userId, image, description, views, likes, duration,video} = req.body;
        
        //create a newVideo object from the body request information
        const newVideo={
            id:uuidv4(),
            title,
            channel,
            avatar,
            userId,
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
        fs.writeFileSync('./server/data.json', data, ()=>{
            console.log("Data written to server");
        });

        //return the video to the user
        res.status(201).json(newVideo);
    })


//REQUEST: delete request to remove a specific video
//PARAMS: :videoId=>id of the video to be removed
//RETURN: the deleted video in json format
app.delete('/api/videos/:videoId', (req,res)=>{
    
    //find the location in the array of the video that should be removed
    const requestedVideoIndex=mainVideo.findIndex(video=> video.id===req.params.videoId);
    
    //remove the video from the array
    deletedVideo = mainVideo.splice(requestedVideoIndex,1);
    
    //return the deleted comment
    res.send(deletedVideo);

    //format the json object to a string 
    data = JSON.stringify(mainVideo,null,2);

    //write the formated object to the data store
    fs.writeFile('./server/data.json', data, ()=>{
        console.log("Data removed from server");
    });

});

//REQUEST: get route to access a specific video
//PARAMS: :id : id of the video to be returned
//RETURN: the requested video in json format
app.get('/api/videos/:id', (req,res)=>{
    
    //find the video associated with the requested id
    const requestedVideo=mainVideo.find(video=> video.id===req.params.id);

    //return the video associated with the requested id
    return requestedVideo ? res.status(200).json(requestedVideo): res.status(404).send("failed");
});


//REQUEST: put route to update the number of likes for a video
//PARAMS: :videoId : id of the video to be modified
//RETURN: the updated video in json format

app.put('/api/videos/:videoId/likes', (req, res)=>{

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
    fs.writeFile('./server/data.json', data, ()=>{
        console.log("Data written to server");
    });
})

//REQUEST: post route to add a new comment for a video
//PARAMS: :id : id of the video to be updated
//RETURN: the added comment in json format
app.post('/api/videos/:id/comments', (req,res)=>{
    
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
    res.status(201).json(newComment);
    
    //format the json object to a string 
    data = JSON.stringify(mainVideo,null,2);
    
    //write the formated object to the data store
    fs.writeFile('./server/data.json', data, ()=>{
        console.log("Data written to server");
    });
});

//REQUEST: delete request to remove an comment from a specific video
//PARAMS: :videoId=>id of the video to be updated, :commentId=>id of the comment to be removed
//RETURN: the deleted comment in json format
app.delete('/api/videos/:videoId/comments/:commentId', (req,res)=>{
    
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
    fs.writeFile('./server/data.json', data, ()=>{
        console.log("Data removed from server");
    });

});

//instead of hard setting the port, use the port that heroku dynamically sets
app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

  
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
}

