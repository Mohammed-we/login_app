// التبديل بين صفحة التسجيل و صفحة الدخول
let loginForm = document.getElementById("login-form");
let signUpForm = document.getElementById("sign-up-form");
let homePage = document.getElementById("home");
let welcomeMessage = document.getElementById("welcome-message");

let loginError = document.getElementById("login-error");
let signUpError = document.getElementById("sign-up-error");

let usersDatabase = [];

// التبديل إلى نموذج التسجيل
function showSignUp() {
    loginForm.style.display = "none";
    signUpForm.style.display = "block";
}

// التبديل إلى نموذج تسجيل الدخول
function showLogin() {
    signUpForm.style.display = "none";
    loginForm.style.display = "block";  
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// التحقق من قوة كلمة المرور
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

// تسجيل المستخدم
document.getElementById("sign-up-form-action").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let name = document.getElementById("sign-up-name").value;
    let email = document.getElementById("sign-up-email").value;
    let password = document.getElementById("sign-up-password").value;

    // تحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
        signUpError.textContent = "Please enter a valid email address.";
        signUpError.style.display = "block";
        return;
    }

    // تحقق من قوة كلمة المرور
    if (!validatePassword(password)) {
        signUpError.textContent = "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number.";
        signUpError.style.display = "block";
        return;
    }

    // تحقق إذا كان البريد الإلكتروني مسجل مسبقًا
    if (usersDatabase.some(user => user.email === email)) {
        signUpError.textContent = "This email is already registered. Please choose another one.";
        signUpError.style.display = "block";
        return;
    }

    // إضافة المستخدم إلى قاعدة البيانات
    usersDatabase.push({ name, email, password });

    alert("Registration successful! Now you can log in.");
    showLogin(); // الانتقال إلى صفحة تسجيل الدخول
});

// تسجيل الدخول
document.getElementById("login-form-action").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    // تحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
        loginError.textContent = "Invalid email address.";
        loginError.style.display = "block";
        return;
    }

    // البحث عن المستخدم باستخدام البريد الإلكتروني
    let user = usersDatabase.find(user => user.email === email);

    if (!user) {
        loginError.textContent = "Email not found. Please sign up.";
        loginError.style.display = "block";
        return;
    }

    // تحقق من صحة كلمة المرور
    if (user.password !== password) {
        loginError.textContent = "Invalid password.";
        loginError.style.display = "block";
        return;
    }

    // إذا كان كل شيء صحيح، انتقل إلى صفحة الـ Home
    loginError.style.display = "none";
    homePage.style.display = "block";
    welcomeMessage.textContent = `Welcome, ${user.name}!`;
    loginForm.style.display = "none";
});

// تسجيل الخروج
function logout() {
    homePage.style.display = "none";
    showLogin(); // العودة إلى صفحة تسجيل الدخول
}
