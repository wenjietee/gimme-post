import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
    const [postPrompt, setPostprompt] = useState("");
    const [apiData, setApiData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: "http://127.0.0.1:3000/create",
            body: { prompt: postPrompt },
        };
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const { status, data } = await axios.post(config.url, config.body, {
                headers,
            });
            if (status === 200) {
                setApiData(data);
            }
        } catch (err) {
            console.log(err);
        }
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
            <br />
            <div>
                <div>{apiData?.hashtags?.choices[0].text}</div>
                <div>{apiData?.captions?.choices[0].text}</div>
                <div>
                    <img
                        src={apiData?.image?.data[0].url}
                        alt="openai"
                        width="512"
                        height="512"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
