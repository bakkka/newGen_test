class UserService {
    //Оператор `var` используется для объявления переменных внутри функций или блоков кода, но не внутри классов
    constructor (username, password) {
        this._username = username;
        this._password = password;
    }
    // Вместо `UserService.username` нужно написать `this.username`
    get username(){
        return this._username;
    }
    //Метод для установки username
    set username(value){
        if (typeof value !== 'string' || !value.trim()) {
            throw new Error('Username should be not empty');
        }
        this._username = value;
    }
    //Вместо throw, который вызовет ошибку, лучше использовать return
    get password(){
        return  "You are not allowed to get password";
    }
    set password(value){
        if (typeof value !== 'string' || !value.trim()) {
            throw new Error('Username should be not empty');
        }
        this._password = value;
    }
    //Cтатический метод не имеет доступа к свойствам экземпляра класса
    authenticate_user() {
        const url = `https://examples.com/api/user/authenticate?username=${this.username}&password=${this._password}`;
        //Необходимо использовать асинхронный подход для получения результатов, иначе результат запроса записывается в локальную переменную result. Это значение сбрасывается после выхода из метода
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            //Так как мы возвращаем промис, то переменная result нам не нужна. Мы можем использовать resolve и reject
            xhr.onload = function() {
                // нужно сравнивать с number, а не string '200'
                if (xhr.status === 200) {
                    resolve(true);
                } else {
                    reject(xhr.response);
                }
            };

            xhr.onerror = function() {
                reject('Error connecting to the server');
            };

            xhr.send();
        });
    }
}

$('form #login').click(function () {
            const username = $('#username').val();
            const password = $('#password').val();
            //Нельзя создать новый экземпляр класса UserService() и сразу же вызывать у него метод authenticate_user()
            const user = new UserService();
            user.username = username;
            user.password = password
            //Так как мы используем промис, то вместо условного цикла лучше использовать .then и .catch
            user.authenticate_user()
                .then(() => {
                    window.location.href = "/home";
                })
                .catch(error => {
                    alert(error);
                });
});
