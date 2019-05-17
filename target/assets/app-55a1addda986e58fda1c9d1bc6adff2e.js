(function () {



    $(document).on('submit', 'form', function (event) {
        event.preventDefault();

        const user = serializeToJson($(this).serialize());

        if (!user.username || !user.password) {
            showError('empty');
            return false;
        } else { 
            $.post( $(this).attr('action'), {data: jsonToXML({user: user})}, function(res) {
                const res_json = parseXML(res);
                if ( res_json.error ) {
                    window.location = '/test-app/home?wrong=true';
                    return false;
                } else {
                    window.location = '/test-app/home/user?username=' + res_json.username
                }
            } )
        }
    });

    const ERRORS = {
        'empty': "You need fill all fields.",
        'wrong_data': 'Please, enter correct username and password'
    };

    function serializeToJson(data) {
        const fields = {};
        data.split('&').forEach(el => {
            const value = el.split('=');
            fields[value[0]] = value[1];
        });
        return fields;
    }
    function validateUsernameAndPassword(user) {
        if (!USER_LIST[user.username] || USER_LIST[user.username] != user.password) {
            showError('wrong_data');
            return false;
        } else {
            return user
        }
    }
    function showError(name) {
        $('.page__error.page__error--js').text(ERRORS[name]);
        setTimeout(() => {
            $('.page__error.page__error--js').text('')
        }, 5000);
    }

    function jsonToXML(obj) {
        var xml = '';
        for (var prop in obj) {
            xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
            if (obj[prop] instanceof Array) {
                for (var array in obj[prop]) {
                    xml += "<" + prop + ">";
                    xml += jsonToXML(new Object(obj[prop][array]));
                    xml += "</" + prop + ">";
                }
            } else if (typeof obj[prop] == "object") {
                xml += jsonToXML(new Object(obj[prop]));
            } else {
                xml += obj[prop];
            }
            xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
        }
        var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
        return xml
    }

    function parseXML(xml) {
        var data = {};  
        $(xml).find('entry').each(function(i, el) { 
            data[ $(el).attr('key') ] = $(el).text();
        });
        return data;
    }


})();
