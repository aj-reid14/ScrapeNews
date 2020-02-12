$(document).on("click", ".add-note", function() {
    let parentID = $(this).parent().parent().attr("article-id");
    $(this).parent().find("a.view-note").attr("href", "");
    $(this).parent().find("a.add-note").attr("href", "");
    $(this).parent().find("a.view-note").css("color", "darkred");
    
})

$(document).on("click", ".save-note", function() {
    let parentID = $(this).parent().parent().parent().attr("article-id");
    console.log(parentID);

    $(this).parent().parent().find("a.view-note").attr("href", `#noteview-${parentID}`);
    $(this).parent().parent().find("a.add-note").attr("href", `#noteadd-${parentID}`);
    $(this).parent().parent().find("a.view-note").css("color", "darkblue");

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