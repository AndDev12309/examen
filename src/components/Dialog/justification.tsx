import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
interface SeeJustificationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}

export default function JustificationDialog(props: SeeJustificationModalProps) {
  const { open, onClose, onSave } = props;

  const [justification, setJustification] = useState("");

  const handleSave = () => {
    if (justification === "") {
      return alert("Necesitas una descripción");
    }
    onSave(justification);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: [2, 3, 4],
          borderRadius: 2,
          width: {
            xs: "90%",
            sm: "70%",
            md: 900,
          },
          height: {
            xs: "auto",
            sm: "auto",
            md: "auto",
          },
          maxWidth: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Descripcion para la cita
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Justificación"
              fullWidth
              multiline
              rows={12}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cerrar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Agendar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
