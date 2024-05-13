// alert("hey")
// document.body.innerHTML =  "Hello";

// const inputs = document.getElementsByTagName('input');

// console.log(inputs);

const submitForm = document.querySelector('button');

console.log(submitForm)

// Import Form to DOM
const newPost = document.querySelectorAll('newThreadForm p);

newPost.addEventListener('submit', function(e){
    alert('Hello world');
    console.log(e.target);
    console.log(e);
});
 