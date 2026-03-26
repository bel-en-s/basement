
import "./FeaturedBlogCard.css";
import Tag, { CATEGORIES } from "./UI/Tag";

export default function FeaturedBlogCard() {
  return (
    <article className="featured-card">
      <div className="card-image">
        <img src="./featured-blog-image.png" alt="Creating Daylight" />
      </div>

      <div className="card-content">
        <span className="card-date">Jan 3, 2025</span>

        <h2 className="card-title">
          Creating Daylight <br /> – The Devex
        </h2>

        <div className="card-tags">
          <Tag labels={CATEGORIES.DEV} variant="light" />
        </div>

        <p className="card-description body">
          We're thrilled to unveil our latest advancement in gene therapy,
          poised to transform the landscape of treatment for rare genetic conditions.
        </p>

        <a href="#" className="card-link">
          READ FULL BLOG POST
        </a>
      </div>
    </article>
  );
}

