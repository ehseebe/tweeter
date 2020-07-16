$(document).ready(function() {

  const $tweetText = ('#tweet-text');

  $($tweetText).on('keyup', function(event) {
    const charLength = $(this).val().length;
    const $tweetForm = $(this).closest('form');
    const $counter = $tweetForm.find('.counter');

    $counter.html(140 - charLength);

    //counter is red over limit, black under limit
    if (charLength > 140) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }

  });

});