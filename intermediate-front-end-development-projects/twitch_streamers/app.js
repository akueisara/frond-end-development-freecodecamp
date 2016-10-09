var streamers = [];
$(document).ready(function() {
    // var freecodecamp_url = "https://api.twitch.tv/kraken/streams/freecodecamp";
    // $.ajax({
    //     url: freecodecamp_url,
    //     headers: {
    //         'Client-ID': 'rvo1n920rqgdmjexx0wolgdfc9n2x39'
    //     },
    //     dataType: 'json',
    //     success: function(data) {
    //         if (data.stream === null) {
    //             $('#fccStatus').html("Free Code Camp is Currently OFFLINE!");
    //         } else {
    //             $('#fccStatus').html("Free Code Camp is Currently ONLINE!");
    //         }
    //     }
    // });

    // var followerURL = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels";

    var followerURL = "https://api.twitch.tv/kraken/streams?limit=100";
    $.ajax({
        url: followerURL,
        headers: {
            'Client-ID': 'rvo1n920rqgdmjexx0wolgdfc9n2x39'
        },
        dataType: 'json',
        success: function(data) {
            // for (var i = 0; i < data.follows.length; i++) {
            // var displayName = data.follows[i].channel.display_name;
            for (var i = 0; i < data.streams.length; i++) {
                var displayName = data.streams[i].channel.display_name;
                streamers.push(displayName);
            }

            for (var i = 0; i < streamers.length; i++) {
                var onlineURL = "https://api.twitch.tv/kraken/streams/" + streamers[i];
                $.ajax({
                    url: onlineURL,
                    headers: {
                        'Client-ID': 'rvo1n920rqgdmjexx0wolgdfc9n2x39'
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.stream != null) {
                            var logo = data.stream.channel.logo;
                            if (logo == null) {
                                logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";
                            }
                            var status = data.stream.channel.status;
                            var name = data.stream.channel.display_name;
                            $("#followerInfo").append("<div class ='row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                        }
                    }
                });
            }

            for (var i = 0; i < streamers.length; i++) {
                var url = "https://api.twitch.tv/kraken/streams/" + streamers[i] + "/?callback=";
                $.ajax({
                    url: url,
                    headers: {
                        'Client-ID': 'rvo1n920rqgdmjexx0wolgdfc9n2x39'
                    },
                    dataType: 'json',
                    success: function(stream_data) {
                        var logo;
                        var status;
                        var name;
                        if (stream_data.error) {
                            loge = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g';
                            name = stream_data.message;
                            status = stream_data.error;
                            $("#followerInfo").append("<div class ='row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                        }

                        if (stream_data.stream === null) {
                            console.log(stream_data._links.channel);
                            $.ajax({
                                url: stream_data._links.channel,
                                headers: {
                                    'Client-ID': 'rvo1n920rqgdmjexx0wolgdfc9n2x39'
                                },
                                dataType: 'json',
                                success: function(channel_data) {
                                    status = "OFFLINE";
                                    logo = channel_data.logo;
                                    name = channel_data.display_name;
                                    console.log(stream_data);
                                    if (logo == null) {
                                        logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";
                                    }
                                    $("#followerInfo").append("<div class ='row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                                }
                            });
                        }


                    }
                });
            }



        }

    });

    console.log(streamers);

});
