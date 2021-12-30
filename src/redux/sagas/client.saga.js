import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, TextField, MenuItem } from "@material-ui/core";
import './AddMovie.css'

function AddNewClient() {
    // Declare dispatch and history
    const history = useHistory();
    const dispatch = useDispatch();

    // Declare local states to store input values
    let [name, setName] = useState('');
    let [diagnosis, setDiagnosis] = useState(''); //URL
    let [userId, setUserId] = useState(''); //description
    //let [genre, setGenre] = useState(0); //genre

    // Functions to handle input values being changed
        // Changes input value to whatever the user is typing
    const handleNameChange = (event) => {
        setName(event);
    }
    
    const handleDiagnosisChange = (event) => {
        setDiagnosis(event);
    }

    const handleUserIdChange = (event) => {
        setUserId(event);
    }


    // Handles form being submitted
        // Save values for all inputs into a reducer
        // Clear input forms
        // Return back to movie list
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'NEW_CLIENT', //NEW_FORM
            payload: {name: name, diagnosis_list: diagnosis, user_id: user}
            //payload: {title: name, poster: url, description: description, genre_id: genre}
        })
        setName('');
        setDiagnosis('');
        setUserId('');
        history.goBack();
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" variant="standard" value={name}
                    onChange={(event) => {handleNameChange(event.target.value)}} />
                    <TextField label="Image url (png)" variant="standard" value={url}
                    onChange={(event) => {handleUrlChange(event.target.value)}} />
                    <div>
                        <TextField
                            label="Description"
                            multiline
                            rows={6}
                            value={description}
                            onChange={(event) => {handleDescriptionChange(event.target.value)}}
                            variant="filled" 
                        />
                    </div>
                    <div>
                        <label htmlFor="genres">Choose a genre: </label>
                        <select name="genres" onChange={(event) => {handleGenreChange(event.target.value)}}>
                            <option></option>
                            <option value="1">Adventure</option>
                            <option value="2">Animated</option>
                            <option value="3">Biographical</option>
                            <option value="4">Comedy</option>
                            <option value="5">Disaster</option>
                            <option value="6">Drama</option>
                            <option value="7">Epic</option>
                            <option value="8">Fantasy</option>
                            <option value="9">Musical</option>
                            <option value="10">Romantic</option>
                            <option value="11">Science Fiction</option>
                            <option value="12">Space-Opera</option>
                            <option value="13">Superhero</option>
                        </select>
                    </div>
                    <div className="form-buttons">
                        <Button variant="contained" onClick={() => {history.goBack()}}>Cancel</Button>
                        <Button variant="contained" type="submit" onClick={() => {history.goBack()}}>Save</Button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default AddMovie;