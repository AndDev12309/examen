import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAuth } from "@/context/Auth";

interface ItemCardProps {
  title: string;
  description: string;
  image: string;
  actions?: React.ReactNode;
}

const ItemCard = ({ title, description, image, actions }: ItemCardProps) => {
  const { user } = useAuth();
  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 220,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={
          user && user.role.name === "admin"
            ? "https://static.vecteezy.com/system/resources/previews/016/653/462/non_2x/line-icon-for-specialties-vector.jpg"
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bukEq4Z8k_5AFnLXDmeCz0qwcKvmEdsNrA&s"
        }
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardHeader
        title={title}
        slotProps={{
          title: {
            variant: "h6",
            fontWeight: "bold",
            sx: { color: "primary.main" },
          },
        }}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ py: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      {actions && (
        <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

export default ItemCard;
