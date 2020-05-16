jQuery(document).ready(function ($) {
    console.log("Page loaded");
    // function to create book list item
    function createBookListItem(book) {
      var $li = $("<li>");
      $li.addClass("list-group-item hover-invert cursor-pointer list-bg-color list-item-font");
      $li.html(book.id + ") " + book.title + " by " + book.author);
      $li.data("bookId", book.id);
      return $li;
    }
  
    //message to user to click on a title for more info
    $("#click-for-info").addClass("display-4 text-center");
    $("#click-for-info").html("Select a title to learn more!");
  
    //makes sure all contents in info card are clear/not showing upon page load
    $("#card").addClass("d-none");
  
    //displays loading message for book list
    $("#loading-book-list").html("Loading list of available books...");
  
    //making API request
    var request = axios.get("http://csc225.mockable.io/books");
  
    //console log to confim API is accessed
    console.log("Request for API granted");
  
    //functions runs after success for access to API
    request.then(function (response) {
      //for each item, call function to make book list item
      response.data.forEach(function (book) {
        $("#book-list").append(createBookListItem(book));
        //hide loading message by turning message into blank space
        $("#loading-book-list").addClass("d-none");
      });
  
      //console log to confrim book list made
      console.log("Book list successfully made");
  
      //if user clicks a book title, the following will happen
      $(".list-group-item").on("click", function () {

        //console log to confirm a book has been selected
        console.log("Book has been sleected");
  
        //makes sure info card is clear when a book is selected
        $("#book-info").addClass("d-none");
  
        //contents of info card will now be shown upon book selection
        $("#card").removeClass("d-none");
  
        //clears loading notification for book meta
        $("#loading-notification").removeClass("d-none");
  
        //shows loading img by removing class display none
        $("#loading-img").removeClass("d-none");
  
        //hides message for user to select a book
        $("#click-for-info").addClass("d-none");
  
        //removes the class active from all classes so previously selected books are no longer active
        $(".list-group-item").removeClass("active");
  
        //targets book id that user selected
        var bookId = $(this).data("bookId");
  
        //add class of active on book that the user selected so only the book that the user selected is active
        $(this).addClass("active");
  
        //sets a variable for the loading image
        var $img = $("<img>")
          .attr("src", "https://media0.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif")
          .attr("alt", "https://media0.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif");
  
        //inserts loading image to html and user will see a centered image for loading
        $("#loading-img").html($img);
        $("#loading-img").addClass("text-center");
  
        //message for user that book info is loading
        $("#loading-notification").html("Loading book info...");
        $("#loading-notification").addClass("display-4 text-center");
  
        //making request to access API and function runs if access is granted
        axios
          .get("http://csc225.mockable.io/books/" + bookId)
          .then(function (response) {
            //console log to confirm access to API
            console.log("API for selected book accessed");
  
            //hides loading notification since info is now loaded
            $("#loading-notification").addClass("d-none");
  
            //hides loading image since book cover will be loaded
            $("#loading-img").addClass("d-none");
  
            //now shows content that would go inside the div of id book-info
            $("#book-info").removeClass("d-none");
  
            //makes img element for book cover and inserts it to html
            var $img = $("<img>")
              .attr("src", response.data.cover)
              .attr("alt", response.data.cover);
            $("#book-cover").html($img);
  
            //inserts title of book into card
            $("#book-title").html(response.data.title);
  
            //inserts author of book into card
            $("#book-author").html("Author: " + response.data.author);
  
            //inserts country of book into card
            $("#book-country").html("Country: " + response.data.country);
  
            //inserts language of book into card
            $("#book-language").html("Language: " + response.data.language);
  
            //inserts year of book into card
            $("#book-year").html("Year: " + response.data.year);
  
            //inserts pages of book into card
            $("#book-pages").html("Pages: " + response.data.pages);
  
            //makes a clickable link who's destination is the book website pulled from the API
            $(document).ready(function () {
              var link = $("<a>");
              link
                .attr("href", response.data.link)
                .attr("title", "Link to book")
                .attr("target", "_blank");
              link.text("Click here to learn more!");
              link.addClass("link text-light");
              $("#book-link").html(link);
            });
          });
      });
    });
  });
  