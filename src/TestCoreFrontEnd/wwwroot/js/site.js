/// <reference path="../../views/employee/update.cshtml" />
// Write your Javascript code.


var url = 'http://poc-web-api-sneha.cloudapps.click2cloud.org/api/test'//'http://192.168.0.183:812/api/values' //'http://localhost:1025/api/values'//
var Table = $('#tblentry', '.bs-example');
var Arr = [];
var SpReturnVal = '';

function GetEmployee() {

    jQuery.support.cors = true;
    
    $.get(url + '/GetData', function (person) {
        bindHtml(person);
    });

   // GetCall();
}


function bindHtml(data) {
    var tbody = Table.find('#tbody');

    tbody.html('');



    for (var i = 0; i < data.length; i++) {
        var gender = '';
        gender = (data[i].gender == false) ? 'Female' : 'Male';
        var td = '';
        var tr = '';
        Arr[i] = new Array();
        Arr[i].push(data[i].id, data[i]);

        tr += '<tr>';
        td += '<td>' + data[i].id + '</td>'
        td += '<td>' + data[i].empName + '</td>'
        td += '<td>' + data[i].empLastName + '</td>'
        td += '<td>' + gender + '</td>'
        td += '<td>' + data[i].city + '</td>'
        td += '<td>' + data[i].designation + '</td>'
        td += '<td>' + data[i].salary + '</td>'
        td += '<td> <a asp-controller="Employee"  style="cursor:pointer"  href="' + location.href + '/Employee/Update?id=' + data[i].id + '"  asp-action="Update">Update</a> <a style="cursor:pointer" asp-controller="Employee" onclick="ConfirmDelete(' + data[i].id + ')" asp-action="Delete">Delete</a></td>'

        tr = tr + td
        tr += '</tr>'
        tbody.append(tr);
    }

    var localData = window.localStorage;
    var persistentData = window.localStorage;
    var jsonOrder = JSON.stringify(data);
    persistentData.setItem("myArr", jsonOrder);
}

function InsertEmployee(employee) {
    var methodname = "ImportEmployee"
    methodname = "Insert"

    SendRequest(employee, methodname, 'POST');


    //var data = JSON.stringify(employee);
    //DAL(methodname,data,"POST");

}

function UpdateEmployee(employee) {
    var methodname = "UpdateEmployee"
    methodname = "Update"
    SendRequest(employee, methodname, 'PUT');

    //var data = JSON.stringify(employee);
    //DAL(methodname, data, "PUT");

}

function DeleteEmployee(empId) {
    var methodName = "DeleteEmployee"
    methodName = "Delete"
    jQuery.support.cors = true;
    var url1 = url + "/" + methodName //+ "?id=" + empId

    var data = {
        "id": empId
    };
    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var resp = req.responseText;

            if (resp != "" && resp != null)
                alert(resp);

        }

    }


    req.open('DELETE', url1, false);

    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    req.send(JSON.stringify(data));
}

function SendRequest(data, methodName, type) {

    jQuery.support.cors = true;

    var req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var resp = req.responseText;

            if (resp != "" && resp != null)
                alert(resp);

        }

    }



    req.open(type, url + "/" + methodName, false);

    req.setRequestHeader('Content-Type', 'application/json');



    req.send(JSON.stringify(data));



}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function ConfirmDelete(id) {
    var q = confirm('Are your sure to Delete..??');
    if (q) {

        DeleteEmployee(parseInt(id));
        GetEmployee();
    }
}





function GetCall() {
    jQuery.support.cors = true;
    $.ajax({
        url: url + '/GetData',
        contentType: 'application/json',
        async: true,
        cache: false,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            bindHtml(data);
        },
        status: function myfunction() {

        },
        error: function (x, y, z) {
            alert(x + '\n' + y + '\n' + z);
        }
    });
}


function DAL(methodName, empdata, type) {
    jQuery.support.cors = true;
    var finalurl = url + '/' + methodName + '/';

    $.ajax({
        type: type,
        url: finalurl,
        crossDomain: true,

        async: false,
        cache: false,
        data: empdata,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (result, status, jqXHR) {
            alert(result.responseText);
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}
