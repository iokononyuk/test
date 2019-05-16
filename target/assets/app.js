(function () {
    


    $(document).on('submit', 'form', function (event) {
        event.preventDefault();

        const user = serializeToJson($(this).serialize());

        if (!user.username || !user.password) {
            showError('empty');
            return false;
        } else {
            this.submit();
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


})();
