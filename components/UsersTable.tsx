"use client";
import { PersonAddAltTwoTone } from "@mui/icons-material";
import { Container, Typography, Stack, Button, Pagination } from "@mui/material";
import TableEntries from "./TableEntries";
import { useEffect, useState } from "react";
import UserFormModal from "./ui/Modal";
export interface UsersI {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
}

export default function UsersTable() {
    const [users, setUsers] = useState<UsersI[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const [paginatedUsers, setPaginatedUsers] = useState<UsersI[]>([]);
    const [selectedUser, setSelectedUser] = useState<UsersI | null>(null)
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await fetch("/data.json");
            const data = await res.json();
            setUsers(data.users);
            setLoading(false);
        }
        fetchUsers();
    }, [])
    useEffect(() => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedUsers(users.slice(startIndex, endIndex));
    }, [users, page, rowsPerPage])
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'edit' | 'add'>('add');
    
    const handleModal = (mode: 'edit' | 'add', user?: UsersI) => {
        setOpen(true);
        setMode(mode);

        if(mode === 'add'){
            setSelectedUser({
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                first_name: "",
                last_name: "",
                email: ""
            })
        } else if (user) {
            setSelectedUser(user);
        }
    }
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    }

    const handleSave = (userToSave: UsersI) => {
        if (mode === 'add') {
            const newUser: UsersI = {
                ...userToSave,
                avatar_url: userToSave.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userToSave.first_name)}`
            };
            setUsers(prev => [newUser, ...prev]); // Add to beginning of array
            setPage(1); // Jump to first page to see newly added user
        } else {
            setUsers(prev => prev.map(u => u.id === userToSave.id ? userToSave : u));
        }
    }

    const totalPages = Math.max(1, Math.ceil(users.length / rowsPerPage));
    const startRecord = users.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
    const endRecord = Math.min(page * rowsPerPage, users.length);

    return (
        <Container maxWidth="lg" sx={{ py: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Users Directory</Typography>

                <Button 
                    variant="contained" 
                    startIcon={<PersonAddAltTwoTone />} 
                    onClick={() => handleModal('add')}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                    Add User
                </Button>
            </Stack>

            <UserFormModal mode={mode} handleClose={handleClose} open={open} user={selectedUser} onSave={handleSave} />
            <TableEntries users={paginatedUsers} loading={loading} onEdit={(user) => handleModal('edit', user)} />

            {users.length > 0 && (
                <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing <strong>{startRecord}</strong> - <strong>{endRecord}</strong> of <strong>{users.length}</strong> records
                    </Typography>
                    <Pagination 
                        count={totalPages} 
                        page={page} 
                        color="primary"
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            )}
        </Container>
    )
}