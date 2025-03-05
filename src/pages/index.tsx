import ItemCard from "@/components/Card/Product";
import JustificationDialog from "@/components/Dialog/justification";
import SpinnerLoading from "@/components/Loading/spinner";
import LoginForm from "@/components/Login/Form";
import RegisterForm from "@/components/Register/Form";
import { StackDiv } from "@/components/StackDiv";
import { useAuth } from "@/context/Auth";
import API from "@/data";
import { useAppointments } from "@/hooks/useAppointments";
import { useSpecialties } from "@/hooks/useSpecialties";
import { Specialty, User } from "@/interfaces";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

interface Fields {
  identifier?: string;
  username?: string;
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const { user, isAuthenticated, onLogin } = useAuth();
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Fields) => {
    setLoading(true);
    try {
      let response;
      if (register) response = await API.post("auth/local/register", data);
      else response = await API.post("auth/local", data);
      if (response) {
        onLogin(response.jwt);
      }
      setRegister(false);
    } catch (error: any) {
      console.error(error);
      if (
        register &&
        error?.error?.message === "Email or Username are already taken"
      )
        alert("Usuario o correo ya registrado");
      else if (!register && error?.error?.name === "ValidationError")
        alert("Credenciales incorrectas");
      else alert("Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} justifyContent={"center"} alignItems={"center"}>
      <StackDiv>
        {!isAuthenticated ? (
          <AuthContent
            register={register}
            setRegister={setRegister}
            onSubmit={onSubmit}
          />
        ) : (
          <>
            <Typography color="success" variant="h4">
              HOLA BIENVENIDO {user?.username}
            </Typography>
            {user && user.role.name === "admin" && <Specialties user={user} />}
            {user && user.role.name === "user" && (
              <SpecialtiesPublic user={user} />
            )}
          </>
        )}
      </StackDiv>
      {loading && <SpinnerLoading />}
    </Stack>
  );
};

export default Page;

interface SpecialtiesProps {
  user: User;
}

export const Specialties = ({ user }: SpecialtiesProps) => {
  const { isLoading, specialties, isError } = useSpecialties({
    filters: {
      user: { documentId: { $eq: user.documentId || 0 } },
    },
  });

  return (
    <Stack spacing={3}>
      {isLoading ? (
        <SpinnerLoading />
      ) : isError ? (
        <Typography>Error al cargar productos</Typography>
      ) : (
        <StackDiv>
          <Grid2 container spacing={2}>
            {specialties.map((specialties) => (
              <Grid2 key={specialties.documentId} size={{ xs: 12, md: 4 }}>
                <ItemCard
                  title={specialties.name}
                  description={specialties.description}
                  image={""}
                />
              </Grid2>
            ))}
          </Grid2>
        </StackDiv>
      )}
    </Stack>
  );
};

interface AppointmentsProps {
  user: User;
}

export const Appointments = ({ user }: AppointmentsProps) => {
  const { isLoading, appointments, isError } = useAppointments({
    filters: {
      user: { documentId: { $eq: user.documentId || 0 } },
    },
  });

  return (
    <Stack spacing={3}>
      {isLoading ? (
        <SpinnerLoading />
      ) : isError ? (
        <Typography>Error al cargar citas</Typography>
      ) : (
        <StackDiv>
          <Grid2 container spacing={2}>
            {appointments.map((appointments) => (
              <Grid2 key={appointments.documentId} size={{ xs: 12, md: 4 }}>
                <ItemCard
                  title={appointments.code}
                  description={appointments.description}
                  image={""}
                />
              </Grid2>
            ))}
          </Grid2>
        </StackDiv>
      )}
    </Stack>
  );
};

const AuthContent = ({ register, setRegister, onSubmit }: any) => {
  if (!register) {
    return (
      <>
        <Typography align="center" variant="h4">
          Iniciar Sesión
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <Typography mt={-4} align="center">
          ¿Aún no tienes cuenta?{" "}
          <Typography
            color="primary"
            component="a"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setRegister(true)}
          >
            Regístrate
          </Typography>
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography align="center" variant="h4">
        Registrarse
      </Typography>
      <RegisterForm onSubmit={onSubmit} />
      <Typography mt={-4} align="center">
        ¿Ya tienes una cuenta?{" "}
        <Typography
          color="primary"
          component="a"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setRegister(false)}
        >
          Iniciar Sesión
        </Typography>
      </Typography>
    </>
  );
};

export const SpecialtiesPublic = ({ user }: SpecialtiesProps) => {
  const { isLoading, specialties, isError } = useSpecialties();
  const [openModal, setOpenModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null
  );

  const handleCreateAppointment = async (justification: string) => {
    if (!selectedSpecialty) {
      setOpenModal(false);
      return alert("Intentenuevamente");
    }
    try {
      await API.post("appointments", {
        data: {
          code: selectedSpecialty.code,
          description: justification,
          specialty: selectedSpecialty.documentId,
          user: user.documentId,
        },
      });
      setOpenModal(false);
      setSelectedSpecialty(null);
    } catch (error) {
      alert("Erro al crear intenta nuevamente...");
    }
  };

  const handleOpenModal = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setOpenModal(true);
  };

  return (
    <Stack spacing={3}>
      {isLoading ? (
        <SpinnerLoading />
      ) : isError ? (
        <Typography>Error al cargar especialidades</Typography>
      ) : (
        <StackDiv>
          <Grid2 container spacing={2}>
            {specialties.map((specialty) => (
              <Grid2 key={specialty.documentId} size={{ xs: 12, md: 4 }}>
                <ItemCard
                  title={specialty.name}
                  description={specialty.description}
                  image={""}
                  actions={
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenModal(specialty)}
                      >
                        Agendar Cita
                      </Button>
                    </Box>
                  }
                />
              </Grid2>
            ))}
          </Grid2>
        </StackDiv>
      )}
      {openModal && (
        <JustificationDialog
          onClose={() => {
            setSelectedSpecialty(null);
            setOpenModal(false);
          }}
          onSave={handleCreateAppointment}
          open={openModal}
        ></JustificationDialog>
      )}
    </Stack>
  );
};
