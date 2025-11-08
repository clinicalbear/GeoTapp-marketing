'use client';

import { useState } from 'react';
import { Box, TextField, Button, Alert, Typography, Paper } from '@mui/material';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 8,
        mb: 8,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
          Contattaci
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Messaggio"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Invio…' : 'Invia'}
          </Button>

          {status === 'success' && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Messaggio inviato con successo!
            </Alert>
          )}

          {status === 'error' && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Errore durante l’invio. Riprova.
            </Alert>
          )}
        </form>
      </Paper>
    </Box>
  );
}
