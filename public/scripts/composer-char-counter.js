$(document).ready(function() {

  const $tweetText = ('#tweet-text');

  $($tweetText).on('keyup', function(event) {
    const charLength = $(this).val().length;
    const $textArea = $(this);
    const $tweetForm = $textArea.closest('form');
    const $counter = $tweetForm.find('.counter');

    $counter.html(140-charLength)

    if (charLength > 140) {
      $counter.addClass("red"); 
    } else {
      $counter.removeClass("red");
    }
  
  })

});