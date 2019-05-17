
package test.app

import grails.converters.XML

class HomeController {
    def authService

    def index() {
        def logins = authService.getUsers();
        [logins: logins]
    }

    def user() {

    }

    def login() {
        String auth_data = params.data;
        def credentials = new XmlSlurper().parseText(auth_data);
        Map user_data = [
            username: credentials.username.text(),
            password: credentials.password.text()
        ]
        Map user  = authService.userExist( user_data );
        XML response = user as XML;
        render response
    } 


} 
