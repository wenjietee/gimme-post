import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";
import PropagateLoader from "react-spinners/PropagateLoader";
function App() {
    const [postPrompt, setPostprompt] = useState("");
    const [apiData, setApiData] = useState({});
    const [isGenerated, setIsGenerated] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerated(false);
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
                setIsLoaded(true);
                setIsGenerated(true);
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
            <Box
                display="flex"
                component="div"
                justifyContent="center"
                alignItems="center"
                minHeight="30vh"
                sx={{ flexDirection: "column" }}
            >
                <Typography variant="h4" gutterBottom>
                    Gimme-Post! 🤖
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic" }}
                    gutterBottom
                >
                    All in one post generator (Captions, Image, Hashtags) using
                    prompts!
                </Typography>
                <TextField
                    id="filled-basic"
                    label="Enter a Prompt"
                    variant="filled"
                    value={postPrompt}
                    onChange={handleChange}
                    size="small"
                    sx={{ m: 2, width: "1000px" }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    size="large"
                    sx={{ m: 2 }}
                >
                    Submit
                </Button>
            </Box>

            <div>
                {isGenerated ? (
                    <>
                        <div>
                            {isLoaded ? apiData.hashtags.choices[0].text : null}
                        </div>
                        <br />
                        <div>
                            {isLoaded ? apiData.captions.choices[0].text : null}
                        </div>
                        <br />
                        <div>
                            {isLoaded ? (
                                <img
                                    src={apiData?.image?.data[0].url}
                                    alt="openai"
                                    width="512"
                                    height="512"
                                />
                            ) : null}
                        </div>
                    </>
                ) : (
                    <PropagateLoader />
                )}
            </div>
        </div>
    );
}

export default App;
