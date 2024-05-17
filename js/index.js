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
newThreadImage();            //     document.getElementById('newThreadImage').innerHTML =
//             document.getElementById('threadImage').value
}

function newThreadImage () {
//get input image
const newThreadImage = document.getElementById('newThreadImage');

//add event listener to detect the uploaded file

newThreadImage.addEventListener('change',function() {
        const file = newThreadImage.files[0];

        //create a file reader object
        const reader = new FileReader();

        //set up onload event handler
        reader.onload = function(e) {
                //get image ur
                const imageDataUrl = e.target.result;

                //display image
                const imagePreview = document.getElementById('threadImage');
                imagePreview.src = imageDataUrl;
        };

// read the selected file's data url
reader.readAsDataURL(file);



});

}

function pmwThread(){
        if (affirmative.checked){
                document.getElementById('firstNameDisplay').innerHTML =
                document.getElementById('firstName').value;
        document.getElementById('argumentDisplay').innerHTML =
                document.getElementById('argument').value;
        } else{
                
                document.getElementById('firstNameDisplayNegative').innerHTML =
                document.getElementById('firstName').value;
                document.getElementById('argumentDisplayNegative').innerHTML =
                document.getElementById('argument').value;
        }
}