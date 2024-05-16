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
    document.getElementById("argDisplay").innerHTML =
            document.getElementById("argue").value;
//     document.getElementById('newThreadImage').innerHTML =
//             document.getElementById('threadImage').value
}

// function newThreadImage(img){
//         'use strict';
//         document.getElementById('newThreadImage').innerHTML = img;
//         document.getElementById('newThreadImage').innerHTML = '<img src="'+img+'"/>';
// }

