$(function() {

   // set initial variables
   var apiData,
       apiItems,
       hashTagName,
       instagramUrl,
       $apiList = $('.api-list');

   // when the form is submitted
   $('#api-search').on('submit', function(event) {

      // not needed as there is no <form> default submit action
      event.preventDefault();

      // toggle the blank image page & "load more" button
      $('.show-hide').toggle();
      // $results.hide();

      // reset all the things
      $apiList.empty();
      apiData, apiItems = '',

      // get the search string
      hashTagName = $('#hashTag').val();
      // If needed, use this function to remove spaces:  .replace(/ /g, '+'),
      instagramUrl = "https://api.instagram.com/v1/tags/" + hashTagName + "/media/recent?client_id=8ba7e057fa6c492984c0dd157ae41a51";

      // make the call to the endpoint
      $.ajax({
         method: 'GET',
         url: instagramUrl,
         dataType: 'jsonp'
      })

      // if it works...
      .done(function(results) {
         apiData = results.data;
         if ( apiData.length !== 0 ) {
            $.each(apiData, function(key, value) {
              var imgLink = value.images.standard_resolution.url;
              var userPic = value.user.profile_picture;
              var userName = value.user.username;
              var userComments = value.comments.count;
              var userLikes = value.likes.count;

              console.log(imgLink);

              apiItems += '<li>' + '<img src="' + imgLink + '" />' + '</li>';
              apiItems += '<li>' + '<img src="' + userPic + '" />' + '</li>';
              apiItems += '<li>' + userName + '</li>';
              apiItems += '<li>' + userComments + '</li>';
              apiItems += '<li>' + userLikes + '</li>';
            });
         } else {
            apiItems += '<p style="margin-top: 18px;">Sorry, hash-tag not found.</p>';
         }
         $apiList.append(apiItems);
      })

      // and if it fails...
      .fail(function() {
         $apiList.append('<li>Sorry! There was a problem, please try again.</li>');
      });
   });
});
