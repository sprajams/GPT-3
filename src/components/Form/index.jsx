import { useEffect, useState } from "react";
import LoadingButton from "@mui/material/Button";
import Clear from "../Clear";
import styles from "./styles.module.scss";

function Form() {
  const [results, setResults] = useState([]);
  const [prompt, setPrompt] = useState("");

  //  UPDATE PROMPT AS USER INPUTS PROMPT
  const handleChange = (event) => {
    //capitalize first letter of prompt
    if (event.target.value) {
      let toCapPrompt =
        event.target.value[0].toUpperCase() +
        event.target.value.slice(1).toLowerCase();
      setPrompt(toCapPrompt);
    }
  };
  //  WHEN USER SUBMITS FORM, SEND REQUEST TO API
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setPrompt("");
  };

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem("savedResults")));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedResults", JSON.stringify(results));
  }, [results]);

  const fetchData = async () => {
    // const data = {
    //   prompt,
    //   temperature: 0.5,
    //   max_tokens: 64,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // };
    //RETURN DATA INTO THE VARIABLE RESPONSEDATA
    // const responseData = await fetch(
    //   "https://api.openai.com/v1/engines/text-curie-001/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
    //     },
    //     body: JSON.stringify(data),
    //   }
    // ).then((res) => res.json());

    // dummy data
    const responseData = {
      id: "cmpl-58yvEJpYF5h6atREgNUyt0Fo8UJS4",
      object: "text_completion",
      created: 1652822492,
      model: "text-curie:001",
      choices: [
        {
          text: "\nSunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.",
          index: 0,
          logprobs: null,
          finish_reason: "stop",
        },
      ],
    };

    // GET RESULT FROM API, NEWEST ON TOP
    setResults((old) => {
      // MAP CHOICES TO Q & A OBJECTS
      const newArr = responseData.choices.map((choice) => {
        return {
          q: prompt,
          a: choice.text,
          id: `${responseData.id} - ${choice.index}`,
        };
      });
      // SPREAD OPERATOR TO PREPEND NEW ITEMS TO RESULTS
      return [...newArr, ...old];
    });
  };

  // CLEAR RESPONSE HSTORY FROM LOCALSTORAGE WHEN USER CONFIRMS YES ON MODAL
  const removeResults = () => {
    localStorage.removeItem("savedResults");
    setResults([]);
  };

  return (
    <div className={styles.outer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.promptWrap}>
          <label htmlFor="prompt">Enter prompt:</label>
          <textarea
            name="prompt"
            id="prompt"
            className={styles.formTextArea}
            value={prompt}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className={styles.buttonWrap}>
          <LoadingButton
            loading="true"
            variant="contained"
            type="submit"
            className={styles.button}
          >
            Submit
          </LoadingButton>
        </div>
      </form>

      <h2>Responses</h2>
      <ul className={styles.resultContainer}>
        {results.map((result) => {
          return (
            <li key={result.id} className={styles.resultWrap}>
              <div className={styles.prompt}>Prompt: {result.q}</div>
              <div>Response: {result.a}</div>
            </li>
          );
        })}
      </ul>
      {results.length > 0 ? <Clear removeResults={removeResults} /> : null}
    </div>
  );
}
export default Form;
