/*global UATMANAGEMENT _config*/

var UATMANAGEMENT = window.UATMANAGEMENT || {};
UATMANAGEMENT.map = UATMANAGEMENT.map || {};

(function rideScopeWrapper($) {

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };
    var userPool;
    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    function signOut(){ 
        var cognitoUser = userPool.getCurrentUser();
        cognitoUser.signOut();
    }
    var authToken;
    UATMANAGEMENT.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/index.html';
    });
    function requestStatus() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/',
            headers: {
                Authorization: authToken
            },
            cache: false,
            contentType: 'application/json',
            success: completeRequest,
             error: function (jqXHR, textStatus, errorThrown) {
                alert("error occurred while get data");
            }
        });
    }
    function completeRequest(result) {
         var table = '';
         var trHTML = '';
         table += '<table class="table table-bordered table-striped" id=table><tr><th>ECS_ServiceName</th><th>Task_DesiredCount</th><th>Task_RunningCount</th></tr></table>'
        $.each(result, function (i, item) {
            trHTML += '<tr><td>' + item.ECS_ServiceName + '</td><td>' + item.Task_DesiredCount + '</td><td>' + item.Task_RunningCount + '</td></tr>';
        });
        $('#output').empty();
        $('#output').append(table);
        $('#table').append(trHTML);        
}
function requestStart() {
    $.ajax({
        method: 'GET',
        url: _config.api.invokeUrl + '/',
        headers: {
            Authorization: authToken
        },
        cache: false,
        contentType: 'application/json',
        success: completeRequest,
         error: function (jqXHR, textStatus, errorThrown) {
            alert("error occurred while get data");
        }
    });
}
function completeRequest(result) {
     var table = '';
     var trHTML = '';
     table += '<table class="table table-bordered table-striped" id=table><tr><th>ECS_ServiceName</th><th>Task_DesiredCount</th><th>Task_RunningCount</th></tr></table>'
    $.each(result, function (i, item) {
        trHTML += '<tr><td>' + item.ECS_ServiceName + '</td><td>' + item.Task_DesiredCount + '</td><td>' + item.Task_RunningCount + '</td></tr>';
    });
    $('#output').empty();
    $('#output').append(table);
    $('#table').append(trHTML);        
}
function requestStop() {
    $.ajax({
        method: 'GET',
        url: _config.api.invokeUrl + '/',
        headers: {
            Authorization: authToken
        },
        cache: false,
        contentType: 'application/json',
        success: completeRequest,
         error: function (jqXHR, textStatus, errorThrown) {
            alert("error occurred while get data");
        }
    });
}
function completeRequest(result) {
     var table = '';
     var trHTML = '';
     table += '<table class="table table-bordered table-striped" id=table><tr><th>ECS_ServiceName</th><th>Task_DesiredCount</th><th>Task_RunningCount</th></tr></table>'
    $.each(result, function (i, item) {
        trHTML += '<tr><td>' + item.ECS_ServiceName + '</td><td>' + item.Task_DesiredCount + '</td><td>' + item.Task_RunningCount + '</td></tr>';
    });
    $('#output').empty();
    $('#output').append(table);
    $('#table').append(trHTML);        
}
    $(function onDocReady() {
        $('#requestStatus').click(handleRequestStatusClick);
        $('#startRequest').click(handleRequestStartClick);
        $('#requestStop').click(handleRequestStopClick);
        $('#signOut').click(handleSignOut);
        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });
    function handleRequestStatusClick() {
        requestStatus();
    }
    function handleRequestStartClick() {
        requestStart();
    }
    function handleRequestStopClick() {
        requestStop();
    }
    function handleSignOut(){
          signOut();
    }
}(jQuery));
