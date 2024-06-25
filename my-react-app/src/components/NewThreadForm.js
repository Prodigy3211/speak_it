function CreatNewThread() {
    <div className="newThreadForm">
        <div className="formTable">
           <form action="newThreadForm.html" method="post">
        <fieldset id="op_post">
            <p>
                <label for="firstName">First Name: </label>
                <input type="text" placeholder="Name" id="firstName" name="firstName" />
            </p>
            <p>
                <label for="thesis">Thesis: </label>
                <input type="text" id="thesis" name="thesis" />
            </p>
            <p>
                <label for="affirm">Are you Affirmative Or Negative? </label>
                    <input type="checkbox" name="affirm" id="affirm" /> Affirmative
                    <input type="checkbox" id="negative" name="negative" /> Negative
            </p>
            <p>
                <label for="argue">Your Argument: </label>
                <input type="text" name="argue" id="argue" />
            </p>
            <p>
                <label for="newThreadImage">Insert Image: </label>
                <input type="file" accept="image/jpeg, image/png" id="newThreadImage" width="50px" height="50px" />Image Upload
            </p>

        </fieldset>
        </form>
         <table>
                <label>First Name</label>
            </table>
        </div>
    </div>
}