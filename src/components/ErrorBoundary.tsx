'use client';

import React, { ReactNode, ReactElement } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import MaterialIcon from '@/components/MaterialIcon';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component for graceful error handling
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              py: 4,
            }}
          >
            <MaterialIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }}>
              error_outline
            </MaterialIcon>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
              Qualcosa è andato storto
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}
            >
              Siamo spiacenti, si è verificato un errore inaspettato. Prova a ricaricare la pagina.
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                sx={{
                  width: '100%',
                  p: 2,
                  mb: 3,
                  bgcolor: 'error.light',
                  borderRadius: 1,
                  overflow: 'auto',
                }}
              >
                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.message}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReset}
                startIcon={<MaterialIcon>refresh</MaterialIcon>}
              >
                Ricarica
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href="/"
                startIcon={<MaterialIcon>home</MaterialIcon>}
              >
                Torna a casa
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children as ReactElement;
  }
}