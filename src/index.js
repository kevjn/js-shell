import style from './index.css';
import React from "react";
import { createRoot } from "react-dom/client";

const Shell = (context) => {
    const [history, setHistory] = React.useState([])
    const textArea = React.useRef()

    return (
        <div onClick={(ev) => textArea.current.focus()}>
            {history.map(({input, output}, index) => {
                return (
                    <div className="Line flex" key={index}>
                        <div className="prompt input">{input}</div>
                        <div className="prompt output">{output}</div>
                    </div>
                )
            })}
            <div className="Input flex">
                <textarea
                    ref={textArea}
                    className="cli"
                    rows="1"
                    autoFocus
                    onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                            const input = textArea.current.value
                            let output;
                            try {
                                output = JSON.stringify(eval(input)) ?? "undefined"
                            } catch (err) {
                                output = err.toString()
                            }
                            setHistory((prevState) => ([...prevState, { input, output }]))
                            textArea.current.value = ""
                            ev.preventDefault()
                        }
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default (root, context) => {
    "use strict";

    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    root.appendChild(styleTag);

    const reactRoot = createRoot(root, {identifierPrefix: "shell"})

    reactRoot.render(
        <React.StrictMode>
            <Shell {...context}/>
        </React.StrictMode>
    )
}
