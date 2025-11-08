import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';

export const dynamic = 'force-static';

export const metadata = {
  title: '404 - Pagina Non Trovata | GeoTapp',
  description: 'La pagina che stai cercando non esiste.',
};

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f8f9fa',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* 404 Text */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '5rem', md: '7rem' },
              fontWeight: 800,
              color: 'primary.main',
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Pagina Non Trovata
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
            La pagina che stai cercando non esiste o è stata spostata. Verifica l&apos;URL e riprova.
          </Typography>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
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
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component="a"
              href="/#contact"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Contattaci
            </Button>
          </Stack>

          {/* Suggested Pages */}
          <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e0e0e0', width: '100%' }}>
            <Typography variant="subtitle2" fontWeight={700} mb={2} color="text.secondary">
              Pagine Consigliate:
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Typography
                component="a"
                href="/"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Home
              </Typography>
              <Typography
                component="a"
                href="/#features"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Funzionalità
              </Typography>
              <Typography
                component="a"
                href="/#pricing"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Prezzi
              </Typography>
              <Typography
                component="a"
                href="/#contact"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Supporto
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}