'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* Error Icon */}
          <ErrorOutlineIcon
            sx={{
              fontSize: '4rem',
              color: 'error.main',
            }}
          />

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: 'error.main',
            }}
          >
            Oops! Qualcosa è andato storto
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '500px',
            }}
          >
            Siamo spiacenti, si è verificato un errore inaspettato. Il nostro team è stato notificato e
            stiamo lavorando per risolverlo.
          </Typography>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <Alert severity="warning" sx={{ width: '100%' }}>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>
                Dettagli Errore (Development):
              </Typography>
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  overflow: 'auto',
                  backgroundColor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                {error.message}
              </Typography>
            </Alert>
          )}

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={reset}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Prova di Nuovo
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="/"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Torna alla Home
            </Button>
          </Stack>

          {/* Support Info */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 4,
            }}
          >
            Hai bisogno di aiuto?{' '}
            <a
              href="#contact"
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Contattaci
            </a>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}