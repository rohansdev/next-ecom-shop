import { Star } from "lucide-react";

const RatingStars = ({
  className,
  starsCount,
}: {
  className: string;
  starsCount: number;
}) => {
  const stars = [];
  for (let i = 0; i <= starsCount -1; i++) {
    stars.push(<Star key={i} className={className} />);
  }

  return <>{stars}</>;
};

export default RatingStars;
