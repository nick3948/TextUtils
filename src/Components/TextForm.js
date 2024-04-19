import React, { useState, useRef, useEffect } from "react";
import xmlFormatter from 'xml-formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [outputText, setOutputText] = useState('');
    const textareaRef = useRef(null);
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.floor(wordCount * 0.005);
    const remainingSeconds = Math.ceil((wordCount * 0.005 - readingTimeMinutes) * 60);

    const handleUpClick = () => {
        setErrorMessage("");
        let upperCaseText = text.toUpperCase();
        setOutputText(upperCaseText)
    }

    const handleLowClick = () => {
        setErrorMessage("");
        let lowerCaseText = text.toLowerCase();
        setOutputText(lowerCaseText)
    }

    const handleJson = () => {
        try {
            setOutputText(JSON.stringify(JSON.parse(text), null, 4))
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Invalid Json - Unable to parse!");
        }
    }

    const handleXml = () => {
        try {
            setOutputText(xmlFormatter(text))
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Invalid XML - Unable to parse!");
        }
    }

    const handleClear = () => {
        setErrorMessage("");
        setOutputText("")
        setText("")
        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText)
            .then(() => { // we write in this way to display toast in react.
                toast.success('Text copied successfully!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((error) => setErrorMessage("Unable to copy content!!"));
    }

    const handleReset = () => {
        setOutputText(text)
    }

    const handleOnChange = (event) => {
        setText(event.target.value)//To update newly entered text
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h5>{props.heading} <FontAwesomeIcon icon={faAlignLeft} beat size="sm" /></h5>{/* To display icon */}
                    <div className="col-md-5">
                        <div className="mb-3 my-2">
                            <ErrorDisplay error={errorMessage} />{/* created a function based component to get error displayed */}
                            <textarea style={{ height: "58vh", maxHeight: "66vh", minHeight: "50vh", minWidth: "50vh" }} ref={textareaRef} className="form-control" placeholder="Enter your text here.." id="inputArea" onChange={handleOnChange}></textarea>
                        </div>
                    </div>

                    <div className="col-md-2 text-center">
                        <div className="my-2">
                            <button className="btn px-3 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleUpClick}>Convert to uppercase</button>
                        </div>
                        <div className="my-4">
                            <button className="btn px-3 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleLowClick}>Convert to lowercase</button>
                        </div>
                        <div className="my-4">
                            <button className="btn px-5 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleJson}>Json Format</button>
                        </div>
                        <div className="my-4">
                            <button className="btn px-5 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleXml}>XML Format</button>
                        </div>
                        <div className="my-4">
                            <button className="btn px-5 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleReset}>Reset Text</button>
                        </div>
                        <div className="my-4">
                            <button className="btn px-5 py-2 btn-primary mx-2" disabled={!text.trim()} onClick={handleClear}>Clear Text</button>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <h5>Preview<button id="liveToastBtn" className="btn btn-primary btn-sm mx-2" disabled={!text.trim()} onClick={handleCopy}><FontAwesomeIcon icon={faCopy} /></button></h5>
                        <textarea style={{ resize: 'both', height: "56vh", maxHeight: "62vh", maxWidth: "85vh", minHeight: "47vh", minWidth: "50vh" }} value={outputText} readOnly className="form-control" id="outputArea" placeholder="Output.."></textarea>
                        <ToastContainer />
                    </div>
                    <p>len : {text.length}  |  Words : {wordCount}  |  Estimated reading time: {readingTimeMinutes} minutes, {remainingSeconds} seconds.</p>
                </div>
            </div>
        </>
    );
}

function ErrorDisplay(props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timeout;
        if (props.error) {
            setVisible(true);
            timeout = setTimeout(() => {
                setVisible(false);
            }, 2000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [props.error]);
    return (
        <>
            {visible && props.error && (
                <div className="position-relative">
                    <div className="position-absolute top-0 start-0 translate-middle p-2">
                        <div className="alert alert-danger d-flex align-items-center" role="alert" style={{ padding: '0.5rem', fontSize: '0.875rem', left: "355px", top: "50px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" width="16"
                                height="16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div>
                                {props.error}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}