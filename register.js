var validator = $('#register-form').validate({
    rules: {
        firstName: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        lastName: {
            required: true,
            minlength: 2,
            maxlength: 15
        },
        password: {
            required: true,
            minlength: 2,
            maxlength: 15,
        },
        'confirm-password': {
            equalTo: '[name="password"]'
        }

    },
    messages: {
        firstName: {
            required: 'Vui long nhap ten cua ban',
            minlength: 'Ten nhap vao qua ngan',
            maxlength: 'Ten nhap vao qua dai',
        },
        lastName: {
            required: 'Vui long nhap ho cua ban',
            minlength: 'Ho nhap vao qua ngan',
            maxlength: 'Ho nhap vao qua dai',
        },
        password: {
            required: 'Vui long nhap password cua ban',
            minlength: 'Pass nhap vao qua ngan. Toi thieu {0} ky tu',
            maxlength: 'Pass nhap vao qua dai',

        },
        'confirm-password': {
            equalTo: 'password ko trung nhau'
        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            firstName: $(form["firstName"]).val(),
            lastName: $(form["lastName"]).val(),
            password: $(form["password"]).val(),
            address: $(form["address"]).val(),
            phone: $(form["phone"]).val(),
            gender: $(form["gender"]).val(),
            email: $(form["email"]).val(),
            avatar: $(form["avatar"]).val(),
            birthday: formatDate($(form["birthday"]).val()),
        };
        $.ajax({
            url: REGISTER_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data);
                console.log('-----');
                console.log(textStatus);
                console.log('-----');
                console.log(jqXHR);
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


