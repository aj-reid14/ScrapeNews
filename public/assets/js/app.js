$(document).on("click", ".save-note", function() {
    let parentID = $(this).parent().parent().parent().attr("article-id");
    console.log(parentID);

    // $.ajax({
    //     method: "POST",
    //     url: "/article/" + parentID,
    //     data: {
            
    //     }
    // })
    // .then(function(data) {
    //     console.log(data);
    // });
})