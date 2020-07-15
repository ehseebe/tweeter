/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = (tweetData) => {
  const $tweet =  `
  <article class='article-tweet'>

      <header class='article-tweet-header'>

        <span class='tweet-profile'>
          <span class='tweet-profile-pic'>
            <img src="${tweetData.avatars}" alt="profile picture" width="35" height="35">
              </span>
              <span class='tweet-profile-name'>
                  ${tweetData.name}
            </span>
        </span> 

              <span class='tweet-handle'>
              ${tweetData.handle}
            </span>
      </header>

        <div class="tweet-content">
          <p>${tweetData.content.text}</p>
        </div>

        <footer class='article-tweet-footer'>

          <span class='tweet-date'>
            ${tweetData.created_at} days ago
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


const renderTweets = (tweet) => {
  const db = 'http://localhost8080/tweets';
  //GET INFORMATION from an API ( a server with data )
  $.ajax({
      url: apiWithParam,
      method: "GET",
  }).then( (response) => {
      $('#item-container').empty()
      console.log("AJAX call came back with response");
      response.forEach( (element) => {
          if ( element ) {

              console.log(element.show.image);
              let tempItem = createItem(element);
              $('#item-container').append(tempItem);
          }
      })
  }).catch((e) => console.log(e));
  //then once we got the information, we will use the function we built (createItem)
  // to append multiple items we found

}

const $tweet = createTweetElement(tweet);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

$(document).ready(function() {
  // $('#search').on('submit', (evt) => {
  //     evt.preventDefault();
  //     //console.log(evt.target.searchParam.value);
  //     const searchParameter = evt.target.searchParam.value;
  //     searchItem(searchParameter);
  // })

  console.log("READY!!");

})