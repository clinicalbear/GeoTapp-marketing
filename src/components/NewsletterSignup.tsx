'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import MaterialIcon from '@/components/MaterialIcon';
import { subscribeNewsletter } from '@/lib/api';
import { isValidEmail } from '@/lib/api';

interface NewsletterSignupProps {
  variant?: 'default' | 'footer' | 'sidebar';
  fullWidth?: boolean;
}

export default function NewsletterSignup({
  variant = 'default',
  fullWidth = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      setError('Inserisci un email valido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await subscribeNewsletter({ email, name, company });

      if (response.success) {
        setSuccess(true);
        setEmail('');
        setName('');
        setCompany('');
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.error || 'Errore nella sottoscrizione');
      }
    } catch (err) {
      setError('Errore di connessione. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'footer') {
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {success && (
          <Alert severity="success" icon={<MaterialIcon>check_circle</MaterialIcon>}>
            Grazie! Controlla la tua email
          </Alert>
        )}
        {error && (
          <Alert severity="error" icon={<MaterialIcon>error</MaterialIcon>}>
            {error}
          </Alert>
        )}
        <TextField
          size="small"
          placeholder="Il tuo nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading || success}
          fullWidth
        />
        <TextField
          size="small"
          placeholder="La tua azienda"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={loading || success}
          fullWidth
        />
        <TextField
          size="small"
          placeholder="Il tuo email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || success}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || success}
          endIcon={
            loading ? <CircularProgress size={20} /> : <MaterialIcon>send</MaterialIcon>
          }
        >
          {loading ? 'Invio...' : success ? 'Iscritto!' : 'Iscriviti'}
        </Button>
      </Box>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          💌 Newsletter esclusiva
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Ricevi tips e novità direttamente nella tua inbox
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {success && (
            <Alert severity="success" sx={{ fontSize: '0.875rem' }}>
              Perfetto! Controlla la tua email
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ fontSize: '0.875rem' }}>
              {error}
            </Alert>
          )}
          <TextField
            size="small"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || success}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || success}
            size="small"
          >
            {loading ? 'Invio...' : 'Iscriviti'}
          </Button>
        </Box>
      </Paper>
    );
  }

  // Default variant
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={1}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
          color: 'common.white',
        }}
      >
        <MaterialIcon sx={{ fontSize: 48, mb: 2 }}>mail_outline</MaterialIcon>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Rimani aggiornato
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
          Ricevi gli ultimi aggiornamenti, tips e offerte esclusive direttamente nella tua inbox
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {success && (
            <Alert severity="success" icon={<MaterialIcon>check_circle</MaterialIcon>}>
              Grazie! Controlla la tua email
            </Alert>
          )}
          {error && (
            <Alert severity="error" icon={<MaterialIcon>error</MaterialIcon>}>
              {error}
            </Alert>
          )}

          <TextField
            placeholder="Il tuo nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || success}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            }}
          />

          <TextField
            placeholder="La tua azienda"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading || success}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            }}
          />

          <TextField
            placeholder="Il tuo email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || success}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            disabled={loading || success}
            endIcon={
              loading ? (
                <CircularProgress size={20} />
              ) : (
                <MaterialIcon>send</MaterialIcon>
              )
            }
            sx={{
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5,
            }}
          >
            {loading ? 'Invio in corso...' : success ? 'Iscritto con successo!' : 'Iscriviti gratis'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}