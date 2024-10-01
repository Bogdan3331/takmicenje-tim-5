import { Link } from "react-router-dom";

interface PrimaryBtnProps {
  link: string;
  children: React.ReactNode;
  className: string;
}

function PrimaryBtn({ link, children, className }: PrimaryBtnProps) {
  return (
    <Link to={link}>
      <button className={className}>{children}</button>
    </Link>
  );
}

export default PrimaryBtn;
