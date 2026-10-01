import { Box } from "@mui/material";
import Header from "@/components/Header";
import UsersTable from "@/components/UsersTable";


export default function Home() {
  return (
    <Box>
      <Header />

      <UsersTable />
    </Box>
  );
}