$(document).on("click", ".add-note", function() {
    let parentID = $(this).parent().parent().attr("article-id");
    console.log(parentID);
})