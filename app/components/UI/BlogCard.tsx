import Tag, { Category } from "./Tag";
import SecondaryButton from "./SecondaryButton";

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  category: Category;
}

export default function BlogCard({
  image,
  date,
  title,
  category,
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <img className="blog-card-img" src={image} alt={title} />
      </div>

      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span >{date}</span>
        </div>

        <h3 className="blog-card-title">{title}</h3>
          <Tag labels={category} variant="light" />
        <div className="blog-card-footer">

          <SecondaryButton text="Read More" variant="white" />
        </div>
      </div>
    </article>
  );
}