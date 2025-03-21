import { Link } from 'react-router-dom';

interface NavLinksProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: string;
}

export function NavLinks({ href, children, ...props }: NavLinksProps) {
  return (
    <Link to={href} {...props} className="">
      {children}
    </Link>
  );
}