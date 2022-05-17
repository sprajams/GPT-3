import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

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
    const responseData = {
      id: "cmpl-58eWjx8g5KflvWM5naH5sAnMTHfN2",
      object: "text_completion",
      created: 1652744093,
      model: "text-curie:001",
      choices: [
        {
          text: "\n\nThere are seven days in a week.",
          index: 0,
          logprobs: null,
          finish_reason: "stop",
        },
      ],
    };
    // GET RESULT FROM API
    setResults((curr) => {
      const newItem = { q: prompt, a: responseData.choices[0].text };
      return [...curr, newItem];
    });
  };

  return (
    <div className={styles.outer}>
      Form
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Enter prompt:</label>
        <input
          type="text"
          name="name"
          id="prompt"
          className={styles.formInput}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      {results.map((result) => {
        return (
          <div>
            <div>Prompt:{result.q}</div>
            <div>Answer:{result.a}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Form;
