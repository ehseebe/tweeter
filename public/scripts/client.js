/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

//loops through tweets, applies form, outputs to page
const renderTweets = (tweetData) => {
  for(let item of tweetData) {
    $('#tweet-container').append(createTweetElement(item));
  } 
}

//tweet form
const createTweetElement = (tweet) => {
  let readableDate = new Date(tweet.created_at);
  
  const $tweet =  `
  <article class='article-tweet'>

      <header class='article-tweet-header'>

        <span class='tweet-profile'>
          <span class='tweet-profile-pic'>
            <img src="${tweet.user.avatars}" alt="profile picture" width="35" height="35">
              </span>
              <span class='tweet-profile-name'>
                  ${tweet.user.name}
            </span>
        </span> 

              <span class='tweet-handle'>
              ${tweet.user.handle}
            </span>
      </header>

        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>

        <footer class='article-tweet-footer'>

          <span class='tweet-date'>
            ${readableDate} days ago
            </span>

          <span class='tweet-icons'>
            <img src="/images/flag-icon.png" alt="flag-icon" width="10" height="10">
            <img src="/images/retweet-icon.png" alt="retweet-icon" width="10" height="10">
            <img src="/images/heart-icon.png" alt="heart-icon" width="10" height="10">
          </span>

        </footer>

  </article>`;

  return $tweet;
}


$(document).ready(function() {
  renderTweets(tweetData);
})