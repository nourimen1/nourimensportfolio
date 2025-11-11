import { forwardRef } from 'react';
import { Link as RouterLink } from '@remix-run/react';
import { classes } from '~/utils/style';
import styles from './link.module.css';

// Only enable view transitions on client-side to avoid SSR warnings
const viewTransitionProps = typeof window !== 'undefined' ? { unstable_viewTransition: true } : {};

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

function isAnchor(href) {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  return href?.includes('://') || href?.[0] === '#' || isValidExtension;
}

export const Link = forwardRef(
  ({ rel, target, children, secondary, className, href, unstable_viewTransition, prefetch, ...rest }, ref) => {
    const isExternal = href?.includes('://');
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isExternal ? '_blank' : undefined);

    const linkProps = {
      className: classes(styles.link, className),
      ['data-secondary']: secondary,
      rel: relValue,
      href: href,
      target: targetValue,
      ref: ref,
      ...rest,
    };

    if (isAnchor(href)) {
      return (
        <a {...linkProps} href={href}>
          {children}
        </a>
      );
    }

    // Filter out href and other props that shouldn't be passed to RouterLink
    // RouterLink uses 'to' instead of 'href'
    const { href: _, 'data-secondary': dataSecondary, ...routerLinkProps } = linkProps;
    
    return (
      <RouterLink 
        {...viewTransitionProps}
        prefetch={prefetch || "intent"} 
        {...routerLinkProps} 
        to={href}
        data-secondary={dataSecondary}
      >
        {children}
      </RouterLink>
    );
  }
);
