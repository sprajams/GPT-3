import { useState } from "react";
import PopUp from "../PopUp";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";

function Clear({ removeResults }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(true);
  };
  return (
    <div>
      <PopUp
        setState={setOpen}
        state={open}
        removeResults={removeResults}
        description={`Are you sure you want to clear your response history? No take
      backs.`}
      />

      <div className={styles.buttonWrap}>
        <Button
          variant="outlined"
          color="error"
          className={styles.button}
          onClick={onClick}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Clear;
