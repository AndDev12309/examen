import { StackDiv } from "@/components/StackDiv";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface Fields {
  username: string;
  email: string;
  password: string;
}

interface FormProps {
  onSubmit: (data: Fields) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const form = useForm<Fields>({ mode: "all" });
  const { handleSubmit, control } = form;

  return (
    <Stack spacing={3}>
      <StackDiv>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "email is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Passwrod is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Box mt={2} display={"flex"} justifyContent={"center"}>
              <Button type="submit" variant="contained" color="primary">
                Registrarse
              </Button>
            </Box>
          </form>
        </FormProvider>
      </StackDiv>
    </Stack>
  );
};

export default Form;
