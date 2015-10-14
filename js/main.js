$(function() {

   // set initial variables
   var apiData,
       apiItems,
       hashTagName,
       instagramUrl,
       $apiList = $('.api-list');

   // hide the "load more" button to start
   $('article img').show();
   $('aside').hide();

   // when the form is submitted
   $('#api-search').on('submit', function(event) {
      event.preventDefault();

      // toggle the blank image page & "load more" button
      $('article img').hide();
      $('aside').show();

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

              apiItems += '<div class="container">';
              apiItems += '<img src="' + imgLink + '" />';
                apiItems += '<div class="metta-box">';
                  // on one line...
                  apiItems += '<div class="item1"><img src="' + userPic + '" /></div>';
                  // or multiple lines
                  apiItems += '<div class="item2">';
                    apiItems += userName;
                    apiItems += '<div class="item2a">';
                      apiItems += '<i class="fa fa-comments"></i>' + userComments + '   ';
                      apiItems += '<i class="fa fa-heart"></i>' + userLikes;
                      apiItems += '</div>';
                  apiItems += '</div>';
                apiItems += '</div>';
              apiItems += '</div>';
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
