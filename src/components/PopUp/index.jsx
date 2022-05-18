import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";

function PopUp({ state, setState, removeResults, description }) {
  // CLOSE MODAL
  const handleClose = () => setState(false);

  return (
    <div>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <div className={styles.boxInner}>
            <div id="modal-modal-description">{description}</div>

            {removeResults ? (
              <div className={styles.buttonWrap}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    removeResults();
                    handleClose();
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  No
                </Button>
              </div>
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUp;
