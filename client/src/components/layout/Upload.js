import React from 'react';
//import './App.css';
import axios from 'axios';

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/api/uploadFile', formData)
            .then(() => {
                console.log("success");
                alert("The file is successfully uploaded");
            }).catch((error) => {
                console.log(error)
            });
    }

    onChange(e) {
        this.setState({ file: e.target.files });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" className="custom-file-input" name="myImage" onChange={this.onChange} />
                {console.log(this.state.file)}
                <button className="upload-button" type="submit">Upload to DB</button>
            </form>
        )
    }
}

export default Upload;