import SpinnerLoading from "@/components/Loading/spinner";
import { StackDiv } from "@/components/StackDiv";
import { useAuth } from "@/context/Auth";
import API from "@/data";
import { withAuth } from "@/hocs/withAuth";
import { usePatient } from "@/hooks/usePatient";
import { Patient } from "@/interfaces";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const { user } = useAuth();
  const { isLoading, isError, patient, mutate } = usePatient({
    populate: { user: true },
    filters: {
      user: { documentId: { $eq: user?.documentId || 0 } },
    },
  });
  const form = useForm<Patient>({
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (patient.length > 0) {
      reset(patient[0]);
    }
  }, [patient]);

  const onSubmit = async (data: Patient) => {
    moment(data.birthdate, "YYYY-MM-DD");
    try {
      if (patient.length > 0) {
        await API.put(`patients/${patient[0].documentId}`, {
          data: {
            name: data.name,
            lastname: data.lastname,
            identity: data.identity,
            birthdate: data.birthdate,
            gender: data.gender,
            city: data.city,
            address: data.address,
            phone: data.phone,
          },
        });
      } else {
        await API.post("patients", {
          data: { ...data, user: user?.documentId },
        });
      }
      mutate();
    } catch (error: any) {
      alert("Error Intente nuevamnete:" + error.error.message);
    }
  };

  return (
    <Stack spacing={3}>
      <StackDiv>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "Nombre es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="lastname"
                  rules={{ required: "Apelido es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Apellido"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="identity"
                  rules={{ required: "Cedula es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cédula"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="birthdate"
                  rules={{ required: "Fecha de nacimiento es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      label="Fecha de Nacimiento"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="gender"
                  rules={{ required: "Genero es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Genero"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: "Ciudad es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Ciudad"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="address"
                  rules={{ required: "Direccion es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Direccion"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: "Telefono es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Telefono"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                {patient.length > 0
                  ? "Actializar historia clinica"
                  : "Registrar historia clinica"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </StackDiv>
      {(isLoading || isSubmitting) && <SpinnerLoading />}
    </Stack>
  );
};

export default withAuth(Page);
