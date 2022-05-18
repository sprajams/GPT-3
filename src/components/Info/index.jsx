import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import PopUp from "../PopUp";
import styles from "./styles.module.scss";

function Info() {
  const [info, setInfo] = useState(false);
  const onClick = () => {
    setInfo(true);
  };
  return (
    <div>
      <PopUp
        setState={setInfo}
        state={info}
        description={`Hello. I am a highly intelligent bot designed to answer your questions. Please end the prompt with a punctuation mark. It is up to you to decide if you can trust me. But if you try to trick me I will respond with “unknown” or straight up lies.`}
      />

      <button onClick={onClick} className={styles.icon}>
        <InfoIcon size="x-small" color="primary" />
      </button>
    </div>
  );
}
export default Info;
