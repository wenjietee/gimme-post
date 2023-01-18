import "./App.css";
import { useState } from "react";
function App() {
    const [postPrompt, setPostprompt] = useState("");

    const handleSubmit = (e) => {
        alert("A name was submitted: " + postPrompt);
        e.preventDefault();
    };

    const handleChange = (e) => {
        setPostprompt(e.target.value);
    };

    return (
        <div className="App">
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Prompt:
                        <input
                            type="text"
                            value={postPrompt}
                            onChange={handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <div>Image here</div>
                <div>Caption here</div>
                <div>Hashtags here</div>
            </div>
        </div>
    );
}

export default App;
