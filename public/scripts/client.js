
//loops through tweets, applies form, outputs to page
const renderTweets = (tweetData) => {
  for (let item of tweetData.reverse()) {
    $('#tweet-container').append(createTweetElement(item));
  }
};

//tweet form
const createTweetElement = (tweet) => {
  //need to make a function to parse date and subtract
  let readableDate = new Date(tweet.created_at);

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
};

//AJAX magic - handles tweet submissions, posts tweets to page
$(document).ready(function() {

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
  //page loads with tweets and hides error msgs
  $('.error-1').hide();
  $('.error-2').hide();
  loadTweets();

  $('#submit-tweet').on('submit', function(event) {
    //loads page without refresh
    event.preventDefault();
    
    //tweet text
    const $tweetValue = $(this).find('input').val();

    if ($tweetValue.length < 1) {
      $(".error-1").slideDown("slow");

    } else if ($tweetValue.length > 140) {
      $(".error-2").slideDown("slow");

    } else {

      $('.error-1').slideUp();
      $('.error-2').slideUp();

      //escapes unsafe characters
      $('#tweet-text').val($("<div>").text($tweetValue).html());

      $.post("http://localhost:8080/tweets", $(this).serialize(), function(result) {
        //empties tweet-container and reloads with new tweet
        $('#tweet-container').empty();
        loadTweets();
      });

      //clears tweet form once posted
      $('form').trigger('reset');

    }

  });

});