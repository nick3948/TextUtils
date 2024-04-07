import React, { useState } from "react";

/* 
In this component i have learned about state(Components need to “remember” things: the current input value, the current image, 
the shopping cart. In React, this kind of component-specific memory is called state.), hook(basically it is a variable which 
hold dynamic value). And also learned about handling events.
*/
export default function TextForm(props) {
    const [text, setText] = useState("")//here useState is a hook. text is a state
    // text = "Hello there.." //Wrong way to change the state
    // setText("Hello there..") //Correct way to change the state
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.floor(wordCount * 0.005);
    const remainingSeconds = Math.ceil((wordCount * 0.005 - readingTimeMinutes) * 60);

    const handleUpClick = () => {
        let upperCaseText = text.toUpperCase();
        setText(upperCaseText)
    }

    const handleLowClick = () => {
        let lowerCaseText = text.toLowerCase();
        setText(lowerCaseText)
    }

    const handleClear = () => {
        setText("")
    }

    const handleOnChange = (event) => {
        setText(event.target.value)//To update newly entered text
    }

    return (
        <>
            <div className="container my-3">
                <h2>{props.heading}</h2>
                <div className="mb-3">
                    <textarea className="form-control" placeholder="Enter your text here.." id="myBox" rows="20" value={text} onChange={handleOnChange}></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convert to lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleClear}>Clear</button>
            </div>
            <div className="container my-3">
                <p>len : {text.length}  |  Words : {wordCount}  |  Estimated reading time: {readingTimeMinutes} minutes, {remainingSeconds} seconds.</p>
            </div>
        </>
    );
}
