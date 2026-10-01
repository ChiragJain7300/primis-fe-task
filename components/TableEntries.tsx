import { Edit } from "@mui/icons-material";
import { Avatar, Button, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { UsersI } from "./UsersTable";

interface TableEntriesProps {
  users: UsersI[];
  loading: boolean;
  onEdit: (user: UsersI) => void;
}

export default function TableEntries({ users, loading, onEdit }: TableEntriesProps) {
    const tableHeads = ['Avatar', 'First Name', 'Last Name', 'Email', 'Actions'];
    return (
    <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table>
            <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                    {tableHeads.map((head) => (
                        <TableCell key={head} sx={{ textAlign: "center", fontWeight: "bold" }}>{head}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell align="center"><Skeleton variant="circular" width={36} height={36} sx={{ mx: "auto" }} /></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width="60%" sx={{ mx: "auto" }} /></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width="60%" sx={{ mx: "auto" }} /></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width="80%" sx={{ mx: "auto" }} /></TableCell>
                            <TableCell align="center"><Skeleton variant="rounded" width={80} height={32} sx={{ mx: "auto" }} /></TableCell>
                        </TableRow>
                    ))
                ) : users.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                            No users found.
                        </TableCell>
                    </TableRow>
                ) : (
                    users.map((user) => (
                        <TableRow key={user.id} hover>
                            <TableCell align="center">
                                <Avatar src={user.avatar_url} sx={{ margin: "auto", width: 36, height: 36 }} />
                            </TableCell>
                            <TableCell align="center">{user.first_name}</TableCell>
                            <TableCell align="center">{user.last_name}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">
                                <Button 
                                    variant="outlined" 
                                    size="small" 
                                    startIcon={<Edit />} 
                                    onClick={() => onEdit(user)}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
    );
}