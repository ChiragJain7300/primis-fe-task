"use client";

import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { UsersI } from "../UsersTable";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface UserFormModalProps {
  mode: 'edit' | 'add';
  handleClose: () => void;
  open: boolean;
  user: UsersI | null;
  onSave: (user: UsersI) => void;
}

export default function UserFormModal({
    mode, handleClose, open, user, onSave
}: UserFormModalProps) { 
  
  const [formData, setFormData] = useState<Partial<UsersI>>({});
  const [errors, setErrors] = useState<{first_name?: string; last_name?: string; email?: string}>({});

  // Sync state when modal opens or user changes
  useEffect(() => {
    if (open) {
      if (user) {
        setFormData(user);
      } else {
        setFormData({});
      }
      setErrors({});
    }
  }, [open, user]);

  const handleChange = (field: keyof UsersI) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};

    if (!formData.first_name?.trim()) {
        newErrors.first_name = "First name is required";
        isValid = false;
    }
    if (!formData.last_name?.trim()) {
        newErrors.last_name = "Last name is required";
        isValid = false;
    }
    if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
        onSave(formData as UsersI);
        handleClose();
    }
  };

  return (
    <Modal  
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {mode === 'add' ? 'Add New User' : 'Edit User'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
              <TextField 
                  label="First Name" 
                  variant="outlined" 
                  fullWidth
                  required 
                  value={formData.first_name || ""}
                  onChange={handleChange('first_name')}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
              />
          
              <TextField 
                  label="Last Name" 
                  variant="outlined" 
                  fullWidth
                  required 
                  value={formData.last_name || ""}
                  onChange={handleChange('last_name')}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
              />
          
              <TextField 
                  label="Email" 
                  type="email"
                  variant="outlined" 
                  fullWidth
                  required 
                  value={formData.email || ""}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
              />
              
              <Button 
                variant="contained" 
                type="submit" 
                fullWidth
                size="large"
                sx={{ fontWeight: "bold", mt: 1, py: 1.2 }}
              >
                  {mode === 'add' ? 'Add User' : 'Update User'}
              </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

