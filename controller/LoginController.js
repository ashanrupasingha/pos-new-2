
$("#login_btn").on('click',function (){
    alert("sucsses")
    const email = "ashan050@gmail.com";
    const password = "AN123";

    let inputEmail = $("#inputEmail").val();
    let inputPw = $("#inputPassword").val();

    if((validateEmail(inputEmail)) /* && (validatePassword(inputPw))*/){

        if ((email === inputEmail) && (password === inputPw)){

            $("#login_content").hide();
            $("#home_content").show();
            $(".navbar").show();

        }
    }
    else{

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password!",

        });
    }
})


const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validatePassword = (password) => {
    const passwordRegex = /^[A-Za-z0-9]{6}$/;
    return passwordRegex.test(password);
}

