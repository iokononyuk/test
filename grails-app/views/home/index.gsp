<div>
    <h3 class="page__title">Hello, User!</h3>
    <g:form class="page__form" action="user" method="POST">
        <div>
            <input type="text" class="page__input" placeholder="Username" name="username">
        </div>
        <div>
            <input type="password" class="page__input" placeholder="Password" name="password">
        </div>
        <div>
            <button class="page__button">Login</button>
        </div>
        <div class="page__error page__error--js"></div>
        <g:if test="${params.wrong}">
            <div class="page__error">PLease, enter correct username and password.</div>
        </g:if>
        <div>
            <h4>You can login as:</h4>
            <ul>
                <g:each in="${logins}">
                    <li><b>${it}</b></li>
                </g:each>
            </ul>
        </div>
    </g:form>
</div>