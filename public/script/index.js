// Scrape button
$("#scrape-btn").on("click", function(event) {
  console.log("scraping articles...");
  // Keep the page from reloading.
  event.preventDefault();

  // Empty the articles section.
  $("#article-body").empty();

  // Hit /scrape route to initiate GET request.
  $.ajax("/scrape", {
    type: "GET"
  }).then(function() {
    console.log("Scrape complete");
    // Reload the page to get the scraped data.
    window.location = "/";
  });
});

// Save article button
$("#save-article").on("click", function(event) {
  console.log("saving article...");
  event.preventDefault();

  var id = $(this).attr("data-id");
  $.ajax("/saved/" + id, {
    type: "POST"
  }).then(function(data) {
    alert("article saved!");
    console.log(data);
  });
});

// Delete article button
$("#delete-btn").on("click", function(event) {
  console.log("deleting article...");
  event.preventDefault();

  var id = $(this).attr("data-id");
  $.ajax("/delete/" + id, {
    type: "POST"
  }).then(function(data) {
    alert("article deleted!");
    console.log(data);
    window.location = "/saved";
  });
});
