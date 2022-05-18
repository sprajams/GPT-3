import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";

function PopUp({ setRemove, open, setOpen }) {
  // CLOSE MODAL
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.box}>
          <div className={styles.boxInner}>
            <div>
              Are you sure you want to clear your response history? No take
              backs.
            </div>
            <div className={styles.buttonWrap}>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  setRemove(true);
                  handleClose();
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  console.log("no");
                  setRemove(false);
                  handleClose();
                }}
              >
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUp;
