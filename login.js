var validator = $('#login-form').validate({
    rules: {
        email: {
            required: true
        },
        password: {
            required: true
        }
    },
    messages: {
        email: {
            required: 'Hay nhap email'
        },
        password: {
            required: 'Hay nhap password'
        }
    },
    submitHandler: function (form, event) {
        alert(1);
        event.preventDefault();
        var senderObject = {
            email: $(form["email"]).val(),
            password: $(form["password"]).val(),
        };
        $.ajax({
            url: LOGIN_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            success: function (data, textStatus, jqXHR) {
                alert(data.token);
                localStorage.setItem('token-key', tokenObject.token);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {
                    $('#summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                }
            }
        });
        return false;
    }
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

