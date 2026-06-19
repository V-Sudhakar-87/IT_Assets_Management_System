const user =
JSON.parse(
localStorage.getItem("user")
);

if(user){

    if(user.role === "admin"){

        window.location.replace(
        "admin-dashboard.html"
        );

    }
    else{

        window.location.replace(
        "employee-dashboard.html"
        );

    }

}
async function login(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const message =
    document.getElementById("message");

    try{

        const response =
        await fetch(
        "/api/auth/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })
        });

        const data =
        await response.json();

        if(data.success){

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    if(data.user.role === "admin"){

        window.location.replace(
        "admin-dashboard.html"
        );

    }else{

        window.location.replace(
        "employee-dashboard.html"
        );

    }

}else{

            message.innerHTML =
            data.message;

            message.style.color =
            "red";
        }

    }catch(error){

        message.innerHTML =
        "Server Error";

        message.style.color =
        "red";
    }
}
function showSignup(){

    document.getElementById("signin-form")
    .style.display = "none";

    document.getElementById("signup-form")
    .style.display = "block";
}

function showSignin(){

    document.getElementById("signup-form")
    .style.display = "none";

    document.getElementById("signin-form")
    .style.display = "block";

      // Clear Login Form
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}
async function signup(){

    const name =
    document.getElementById("signupName").value;

    const email =
    document.getElementById("signupEmail").value;

    const password =
    document.getElementById("signupPassword").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const secretKey =
    document.getElementById("secretKey").value;

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;

    }

    const response =
    await fetch(
    "/api/auth/register",
    {
        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            email,
            password,
            secretKey
        })
    });

    const data =
    await response.json();

   if(data.success){

    alert("Admin Created Successfully");

    // Clear Signup Form
    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("secretKey").value = "";

    showSignin();

}else{

    alert(data.message);

}
}