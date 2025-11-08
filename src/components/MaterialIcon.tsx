'use client';

import { Icon } from '@mui/material';
import type { IconProps } from '@mui/material/Icon';

/**
 * Material Icon component wrapper
 * Uses Material Symbols Outlined font
 */
const MaterialIcon = (props: IconProps) => (
  <Icon baseClassName="material-symbols-outlined" {...props} />
);

export default MaterialIcon;