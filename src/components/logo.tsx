import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={props.width || 32}
      height={props.height || 32}
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="hsl(var(--primary))"
        d="M208.3 128.3a92.1 92.1 0 1 1-92.6-92.6 4 4 0 0 1 5.6 5.6 84.1 84.1 0 1 0 81.4 81.4 4 4 0 0 1 5.6 5.6Z"
      />
    </svg>
  );
}
