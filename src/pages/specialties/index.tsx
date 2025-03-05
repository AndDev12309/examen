import SpinnerLoading from "@/components/Loading/spinner";
import { StackDiv } from "@/components/StackDiv";
import TableCustom, { ColumnDefinition } from "@/components/Table/Table";
import { useAuth } from "@/context/Auth";
import API from "@/data";
import { withAuthRole } from "@/hocs/withAuthRole";
import { useSpecialties } from "@/hooks/useSpecialties";
import { Specialty } from "@/interfaces";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading, specialties, isError, mutate } = useSpecialties({
    filters: {
      user: { documentId: { $eq: user?.documentId || 0 } },
    },
  });

  const cell: ColumnDefinition<Specialty>[] = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Codigo",
      accessor: "code",
    },
    {
      header: "Descripción",
      accessor: "description",
    },
  ];

  if (isError) return <Typography>{isError.message}</Typography>;

  const handleEdit = (item: Specialty) => {
    router.push(`/specialties/edit/${item.documentId}`);
  };

  const handleDelete = async (item: Specialty) => {
    try {
      await API.delete(`specialties/${item.documentId}`);
      mutate();
    } catch (error: any) {
      alert("Error Intente nuevamnete:" + error.error.message);
    }
  };

  return (
    <Stack spacing={2}>
      <Box p={2} justifyContent="flex-end" display="flex">
        <Button
          variant="contained"
          onClick={() => router.push("/specialties/create")}
        >
          Crear Especialidad
        </Button>
      </Box>
      <StackDiv>
        <TableCustom
          columns={cell}
          items={specialties}
          isLoading={isLoading}
          orderBy="id"
          order="asc"
          emptyMessage="No hay especialidades registradas"
          listActions={[
            {
              actionName: "Editar",
              actionEvent: (item: Specialty) => handleEdit(item),
            },
            {
              actionName: "Eliminar",
              actionEvent: (item: Specialty) => handleDelete(item),
            },
          ]}
        />
      </StackDiv>
      {isLoading && <SpinnerLoading />}
    </Stack>
  );
};

export default withAuthRole(Page, "admin");
