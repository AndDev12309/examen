import SpinnerLoading from "@/components/Loading/spinner";
import { StackDiv } from "@/components/StackDiv";
import { useAuth } from "@/context/Auth";
import API from "@/data";
import {
  Box,
  Button,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface Fields {
  code: string;
  name: string;
  description: string;
}

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const form = useForm<Fields>({
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = form;

  const onSubmit = async (data: Fields) => {
    try {
      await API.post("specialties", {
        data: { ...data, user: user?.documentId },
      });
      router.push("/specialties");
    } catch (error: any) {
      alert("Error Intente nuevamnete:" + error.error.message);
    }
  };

  return (
    <Stack spacing={3}>
      <StackDiv>
        <Typography justifyContent="center" align="center" variant="h5" p={3}>
          Crear Especialidad
        </Typography>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
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
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Controller
                  control={control}
                  name="code"
                  rules={{ required: "Codigo es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Codigo"
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
                  name="description"
                  rules={{ required: "Descripción es obligatorio" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Descripción"
                      rows={4}
                      multiline
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
            <Box mt={2} gap={2} display="flex">
              <Button type="submit" variant="contained" color="primary">
                Crear
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => router.push("/specialties")}
              >
                Regresar
              </Button>
            </Box>
          </form>
        </FormProvider>
      </StackDiv>
      {isSubmitting && <SpinnerLoading />}
    </Stack>
  );
};

export default Page;
