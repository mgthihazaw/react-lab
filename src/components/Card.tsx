type CardProps = {
  title: string;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
