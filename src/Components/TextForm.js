import React, { useState } from "react";
import xmlFormatter from 'xml-formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

/* 
In this component i have learned about state(Components need to “remember” things: the current input value, the current image, 
the shopping cart. In React, this kind of component-specific memory is called state.), hook(basically it is a variable which 
hold dynamic value). And also learned about handling events.
*/
export default function TextForm(props) {
    const [text, setText] = useState("")//here useState is a hook. text is a state
    // text = "Hello there.." //Wrong way to change the state
    // setText("Hello there..") //Correct way to change the state
    const [errorMessage, setErrorMessage] = useState("");
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.floor(wordCount * 0.005);
    const remainingSeconds = Math.ceil((wordCount * 0.005 - readingTimeMinutes) * 60);

    const handleUpClick = () => {
        setErrorMessage("");
        let upperCaseText = text.toUpperCase();
        setText(upperCaseText)
    }

    const handleLowClick = () => {
        setErrorMessage("");
        let lowerCaseText = text.toLowerCase();
        setText(lowerCaseText)
    }

    const handleJson = () => {
        try {
            setText(JSON.stringify(JSON.parse(text), null, 4))
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Invalid Json - Unable to parse!");
        }
    }

    const handleXml = () => {
        try {
            setText(xmlFormatter(text))
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Invalid XML - Unable to parse!");
        }
    }

    const handleClear = () => {
        setErrorMessage("");
        setText("")
    }

    const handleOnChange = (event) => {
        setText(event.target.value)//To update newly entered text
    }

    return (
        <>
            <div className="container my-3">
                <h2>{props.heading} <FontAwesomeIcon icon={faAlignLeft} beat size="sm" /></h2>{/* To display icon */}
                <ErrorDisplay error={errorMessage} />{/* created a function based component to get error displayed */}
                <div className="mb-3">
                    <textarea className="form-control" placeholder="Enter your text here.." id="myBox" rows="18" value={text} onChange={handleOnChange}></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convert to lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleJson}>Json Format</button>
                <button className="btn btn-primary mx-2" onClick={handleXml}>XML Format</button>
                <button className="btn btn-primary mx-2" onClick={handleClear}>Clear Text</button>
            </div>
            <div className="container my-3">
                <p>len : {text.length}  |  Words : {wordCount}  |  Estimated reading time: {readingTimeMinutes} minutes, {remainingSeconds} seconds.</p>
            </div>
        </>
    );
}

function ErrorDisplay(props) {
    return (
        <>
            {props.error && (
                <div className="container my-3">
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" width="16"
                            height="16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            {props.error}
                        </div>
                    </div>
                </div>
            )}
        </>);
}