$("#submit").on("click", function() {
    $("#output").empty();
    var searchTerm = $("#searchTerm").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "jsonp",
        success: function(data) {
            // console.log(data);
            for (var i = 0; i < data[1].length; i++) {
                $("#output").prepend("<div class='resultlink'><a href=" + data[3][i] + " target='_blank'><div class='well'><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></div></a></div>");

            }
            if (data[1].length == 0) {
                $("#output").prepend("<div class='result'><h5>Sorry, no results were found.</h5></div>");
            }
        }

    });

});
