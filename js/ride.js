/*global UATMANAGEMENT _config*/

var UATMANAGEMENT = window.UATMANAGEMENT || {};
UATMANAGEMENT.map = UATMANAGEMENT.map || {};

(function rideScopeWrapper($) {
    var authToken;
    UATMANAGEMENT.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });
    function requestStart() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/',
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',
            success: function(response) {
                 var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr><td>' + item.ECS_ServiceName + '</td><td>' + item.Task_DesiredCount + '</td><td>' + item.Task_RunningCount + '</td></tr>';
        });
        $('#output').append(trHTML);
            },
             error: function (jqXHR, textStatus, errorThrown) {
                alert("error occurred while get data");
            }
        });
    }
    $(function onDocReady() {
        $('#requestStatus').click(handleRequestClick);
        UATMANAGEMENT.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });
    function handleRequestClick() {
        requestStart();
    }
    function displayUpdate(text) {
        $('#updates').append($('<h1 style="text-align:center;">UAT MANAGEMENT</h1>'));
    }
    function displayOutput(response) {
        $('#output').append($('<h1 style="text-align:left;">' + response + '</h1>'));
    }
}(jQuery));

