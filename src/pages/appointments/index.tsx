import SpinnerLoading from "@/components/Loading/spinner";
import { StackDiv } from "@/components/StackDiv";
import TableCustom, { ColumnDefinition } from "@/components/Table/Table";
import { useAuth } from "@/context/Auth";
import API from "@/data";
import { withAuthRole } from "@/hocs/withAuthRole";
import { useAppointments } from "@/hooks/useAppointments";
import { Appointment } from "@/interfaces";
import { Stack, Typography } from "@mui/material";

const Page = () => {
  const { user } = useAuth();
  const { isLoading, appointments, isError, mutate } = useAppointments({
    filters: {
      user: { documentId: { $eq: user?.documentId || 0 } },
    },
  });

  const cell: ColumnDefinition<Appointment>[] = [
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
    // {
    //   header: "Especialidad",
    //   accessor: "specialty",
    //   render: (item: Appointment) => (
    //     <Typography>{item.specialty.name}</Typography>
    //   ),
    // },
  ];

  if (isError) return <Typography>{isError.message}</Typography>;

  const handleDelete = async (item: Appointment) => {
    try {
      await API.delete(`appointments/${item.documentId}`);
      mutate();
    } catch (error: any) {
      alert("Error Intente nuevamnete:" + error.error.message);
    }
  };

  return (
    <Stack spacing={2}>
      <StackDiv>
        <TableCustom
          columns={cell}
          items={appointments}
          isLoading={isLoading}
          orderBy="id"
          order="asc"
          emptyMessage="No hay citas registradas"
          listActions={[
            {
              actionName: "Eliminar",
              actionEvent: (item: Appointment) => handleDelete(item),
            },
          ]}
        />
      </StackDiv>
      {isLoading && <SpinnerLoading />}
    </Stack>
  );
};

export default withAuthRole(Page, "user");
