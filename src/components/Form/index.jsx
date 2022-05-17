import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";
import { style } from "@mui/system";

function Form() {
  const [results, setResults] = useState([]);
  const [prompt, setPrompt] = useState("");

  //  UPDATE PROMPT AS USER INPUTS PROMPT
  const handleChange = (event) => {
    setPrompt(event.target.value);
  };
  //  WHEN USER SUBMITS FORM, SEND REQUEST TO API
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const data = {
      prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const responseData = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

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

  return (
    <div className={styles.outer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.promptWrap}>
          <label htmlFor="prompt">Enter prompt:</label>
          <textarea
            name="prompt"
            id="prompt"
            className={styles.formInput}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className={styles.buttonWrap}>
          <Button variant="contained" type="submit" className={styles.button}>
            Submit
          </Button>
        </div>
      </form>
      <ul className={styles.resultContainer}>
        {results.map((result) => {
          return (
            <li key={result.id} className={styles.resultWrap}>
              <div>Prompt:{result.q}</div>
              <div>Response:{result.a}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Form;
