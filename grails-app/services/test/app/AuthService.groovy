package test.app

import grails.transaction.Transactional

@Transactional
class AuthService {

    def user_list = [["username": "login", "password": "password"], ["username": "user", "password": "user"]]

    def userExist(user) {
        Map authUser = user_list.find { it.username == user.username && it.password == user.password }
        return authUser ?: [error: true]
    }

    def getUsers() {
        def logins = [];
        user_list.each{
            logins << it.username
        }
        return logins;
    }


}
