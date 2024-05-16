// alert("hey")
// document.body.innerHTML =  "Hello";

// const inputs = document.getElementsByTagName('input');

// console.log(inputs);

const submitForm = document.querySelector('button');

console.log(submitForm)

// Import Form to DOM

function newThread(){
    document.getElementById('newThread').innerHTML =
            document.getElementById("firstName").value;
    document.getElementById('thesisDisplay').innerHTML =
            document.getElementById("thesis").value;
}