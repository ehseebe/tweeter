
//loops through tweets, applies form, renders tweets for output to page
const renderTweets = (tweetData) => {
  for (let item of tweetData.reverse()) {
    $('#tweet-container').append(createTweetElement(item));
  }
};

//form for posted tweets
const createTweetElement = (tweet) => {
  //tweet posting date from database
  let dbDate = tweet.created_at;

  //calculation of relative time using moment.js
  let readableDate = moment(dbDate).fromNow();

  //html for posted tweets
  const $tweet = `
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
            ${readableDate}
            </span>

          <span class='tweet-icons'>
            <img src="/images/flag-icon.png" alt="flag-icon" width="10" height="10">
            <img src="/images/retweet-icon.png" alt="retweet-icon" width="10" height="10">
            <img src="/images/heart-icon.png" alt="heart-icon" width="10" height="10">
          </span>

        </footer>

  </article>`;

  return $tweet;
};

//AJAX magic - handles tweet submissions, posts tweets to page, error message handling and animation
$(document).ready(function() {

  //fetches JSON tweet database, error logs to ensure successful load
  const loadTweets = function() {
    $.getJSON('http://localhost:8080/tweets', (data) => {
      console.log('success');
      renderTweets(data);
    })
      .done(function() {
        console.log("second success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
  };

  //page loads with tweets, hides error msgs, shows new-tweet form
  loadTweets();
  $('.error-1').hide();
  $('.error-2').hide();
  $('.new-tweet').show();

  //nav button toggles new tweet form when clicked
  $('.new-tweet-prompt').on('click', function() {
    if ($(".new-tweet").first().is(":hidden")) {
      $(".new-tweet").slideDown("slow");
    } else {
      $(".new-tweet").slideUp();
    }
  });

  //submits tweet and loads updated page without refresh
  $('#submit-tweet').on('submit', function(event) {

    event.preventDefault();

    //variable to assess contents of tweet form input
    const $tweetValue = $(this).find('input').val();

    //validation of tweet length
    if ($tweetValue.length < 1) {
      $(".error-1").slideDown("slow");

    } else if ($tweetValue.length > 140) {
      $(".error-2").slideDown("slow");

    } else {
      //passed validation, hides error messages for submission
      $('.error-1').slideUp();
      $('.error-2').slideUp();

      //escapes unsafe characters
      $('#tweet-text').val($("<div>").text($tweetValue).html());

      //empties tweet-container and reloads tweet database with new tweet
      $.post("http://localhost:8080/tweets", $(this).serialize(), function(result) {
        $('#tweet-container').empty();
        loadTweets();
      });

      //clears tweet form once posted
      $('form').trigger('reset');
      //resets counter to 140 char
      $('.counter').text(140);

    }

  });

});