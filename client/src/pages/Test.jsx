import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen("paper")} data-oid="7qfdybt">
        scroll=paper
      </Button>
      <Button onClick={handleClickOpen("body")} data-oid="ou0njic">
        scroll=body
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        data-oid="r18i1e:"
      >
        <DialogTitle id="scroll-dialog-title" data-oid="z:49--b">
          Subscribe
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"} data-oid="yum1te3">
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            data-oid="4ni:a7l"
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions data-oid="9:ye35z">
          <Button onClick={handleClose} data-oid="4ac2y60">
            Cancel
          </Button>
          <Button onClick={handleClose} data-oid="gtrcn04">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
