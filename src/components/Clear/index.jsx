import PopUp from "../PopUp";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";

function Clear({ results, setOpen, open, setRemove, onClick }) {
  return (
    <div>
      <PopUp setOpen={setOpen} open={open} setRemove={setRemove} />
      {/* CLEAR BUTTON DISPLAYED ONLY WHEN REPSONES ARE RENDERED */}
      {results.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export default Clear;
