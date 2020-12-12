
var currentUser = {};

$(document).ready(function () {

    var user = JSON.parse(localStorage.getItem("user"));
    //console.log(u.user_name);

    $(".userName").html(user.user_name);
    currentUser = user;
    displayCookies();

});

function logout() {
    window.location.href = "index.html";
}

function displayCookies() {
    var data = {};
    var cookies = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/cookie/get",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            cookies = data.cookies
        },
        error: function (e) {
            console.log("error : ", e)
        }
    });

    //console.log(cookies);

    cookies.forEach(function (cookie) {
        // console.log(cookie.recipe_name);

        //console.log(getUser(cookie.user_id).user_name);

        $(".cookiesList").append(getCookieDiv(cookie, getUser(cookie.user_id).user_name));
    })
}

function getCookieDiv(cookie, userName) {
    var dateParts = cookie.post_date.split("-");
    var jsDate = dateParts[0] + "-" + (dateParts[1] - 1) + "-" + dateParts[2].substr(0, 2);

    return " <div class=\"card  mb-3\"> "
        + " <div class=\"card-header\">" + cookie.recipe_name + "</div> "
        + " <div class=\"card-body\"> "
        + " <h5 class=\"card-title\">Description</h5> "
        + " <p class=\"card-text\"> "
        + cookie.recipe_desc
        + " </p> "
        + "  "
        + " <div class=\"card-footer\"> "
        + " <div class=\"left\"> "
        + " <img src=\"./img/like.jpg\" /><span>10</span> "
        + " <img src=\"./img/dislike.jpg\" /><span>12</span> "
        + " </div> "
        + " <div class=\"right\"> "
        + " <span>Created by <span>" + userName + "</span> On <span>" + jsDate + "</span> </span> "
        + " </div> "
        + " </div> "
        + " </div> "
        + " </div> ";
}

function getUser(userID) {

    var data = {};
    data["user_id"] = userID;
    var user = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: " http://localhost:3000/api/user",
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        timeout: 600000,
        success: function (data) {
            // console.log(data.user);
            user = data.user;
        },
        error: function (e) {
            console.log("error : ", e);
        }
    });

    return user;
}

function addRecipes(event) {

    event.preventDefault();
    console.log(currentUser.user_id);


    var data = {}
    data["recipe_name"] = $("#recipe_name").val();
    data["recipe_desc"] = $("#recipe_desc").val();
    data["user_id"] = currentUser.user_id;


    if (!data["recipe_name"] || !data["recipe_desc"]) {
        console.log("Fields Missing");
    }
    else {

        $("#registerbtn").prop("disabled", true);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: " http://localhost:3000/api/cookie/add",
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 600000,
            success: function (data) {
                console.log("DONE");
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });

    }
}