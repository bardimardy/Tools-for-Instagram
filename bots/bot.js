
require('../src/tools-for-instagram.js');


(async () => {
    //WARNING --- THIS BOT IS CURRENTLY an idea in progress
    // https://github.com/linkfy/Tools-for-Instagram/wiki/Bot-1-%5BDoing%5D
    let likesPerInterval = 15;
    let followsPerInterval = 13;
    let waitMinutesBetweenLikes = 3;
    let waitMinutesBetweenFollows = 4;

    let intervals = [
        ["7:00",    "8:00"],
        ["10:00",   "11:00"],
        ["14:00",   "15:00"],
        ["17:00",   "18:00"],
        ["20:00",   "21:00"],
        ["22:00",   "23:00"],
    ];


    let hashtagArray = [
        "cats",
        "dogs",
        "chameleon",
        "fish",
        "gaming",
        "music"
    ];
    
    let ig = await login();

    
    
    let likeInterval = likeRecentHashtagsByIntervals(
        ig,
        hashtagArray,
        intervals, 
        likesPerInterval, 
        waitMinutesBetweenLikes);

    let followInterval = followRecentHashtagsByIntervals(
        ig,
        hashtagArray,
        intervals, 
        followsPerInterval, 
        waitMinutesBetweenFollows);

    

    process.on('unhandledRejection', async function(err) {
        console.log(err.response.body);
        if(err.name == "IgActionSpamError") {
            console.log("Spam Error, trying to regenerate the cookie".red);
            await removeCookie(ig);
            ig = await login();
        }
    });

})();