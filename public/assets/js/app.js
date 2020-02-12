$(document).on("click", ".add-note", function () {
    let parentID = $(this).parent().parent().attr("article-id");
    $(this).parent().find("a.view-note").attr("href", "");
    $(this).parent().find("a.add-note").attr("href", "");
    $(this).parent().find("a.view-note").css("color", "darkred");

})

$(document).on("click", ".save-note", function () {
    let parentID = $(this).parent().parent().parent().attr("article-id");

    $.ajax({
        method: "POST",
        url: "/article/" + parentID,
        data: {
            body: $(`#notetext-${parentID}`).val().trim()
        }
    }).then(function (data) {        
    });

    $(`#notetext-${parentID}`).val("");

    $(this).parent().parent().find("a.view-note").attr("href", `#noteview-${parentID}`);
    $(this).parent().parent().find("a.add-note").attr("href", `#noteadd-${parentID}`);
    $(this).parent().parent().find("a.view-note").css("color", "darkblue");

})

$(document).on("click", ".view-note", function () {
    let parentID = $(this).parent().parent().attr("article-id");
    // console.log($(`#noteview-${parentID}`).text().trim());

    $.ajax({
        method: "GET",
        url: "/article/" + parentID
    }).then(function (data) {
        $(`#noteview-${parentID}`).find(".note-body").text(data.note.body);
    });

})