$("#scrape-btn").on("click", function() {
  console.log("scraping articles...");
  // Keep the page from reloading.
  event.preventDefault();

  // Empty the articles section.
  $("#article-body").empty();

  // Run the scaping route in controller.js with a GET request.
  $.ajax("/scrape", {
    type: "GET",
    function() {
      $("#scrapeModal").modal("show");
    }
  }).then(function() {
    console.log("Scrape complete");
    // Reload the page to get the scraped data.
    $(".scrapeCloseBtn").on("click", function() {
      window.location.href = "/";
    });
  });
});
