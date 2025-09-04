// src/components/ui/Card.jsx
function Root({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Header({ children }) {
  return <div className="card-header">{children}</div>;
}

function Body({ children, className = '' }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

function Footer({ children }) {
  return <div className="card-footer">{children}</div>;
}

export const Card = Object.assign(Root, {
  Header,
  Body,
  Footer,
});
