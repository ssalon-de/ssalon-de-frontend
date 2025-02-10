type Props = {
  title: string;
  className?: string;
};

const PageTitle: React.FC<Props> = ({ title, className }) => {
  return (
    <h2 className={`text-3xl font-bold text-gray-800 ${className}`}>{title}</h2>
  );
};

export default PageTitle;
