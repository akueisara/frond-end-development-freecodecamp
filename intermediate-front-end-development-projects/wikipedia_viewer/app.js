$("#submit").on("click", function() {
    $("#output").empty();
    var searchTerm = $("#searchTerm").val();
    // console.log(searchTerm);
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm;
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data[1].length; i++) {
                $("#output").prepend("<div><div class='well'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
            }
            if (data[1].length == 0) {
                $("#output").prepend("<div class='result'><h5>Sorry, no results were found.</h5></div>");
            }
        }
    });
});

$("#searchTerm").keypress(function(e) {
    if (e.keyCode === 13) {
        var searchTerm = $("#searchTerm").val();
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            dataType: "json",
            success: function(data, status, jqXHR) {
                console.log(data);
                for (var i = 0; i < data[1].length; i++) {
                    $("#output").prepend("<div><div class='well'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
                }
                if (data[1].length == 0) {
                    $("#output").prepend("<div class='result'><h5>Sorry, no results were found.</h5></div>");
                }
            }

        });
    }
});
