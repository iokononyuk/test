package test.app

class HomeController {
    def authService

    def index() {
        def logins = authService.getUsers();
        [logins: logins]
    }

    def user() {
        def user  = authService.userExist( params )

        if (!user) {
            redirect([action: 'index', params: [wrong: true]]);
            return false;
        }
        [user: params.username]
    }

}
