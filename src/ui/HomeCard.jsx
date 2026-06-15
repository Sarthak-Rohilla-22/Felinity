import { Link } from "react-router";

function HomeCard({ title, description, link, buttonText }) {
  return (
    <div className="rounded-2xl border border-taupe-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h2 className="font-heading text-3xl text-taupe-700">{title}</h2>

      <p className="mt-4 leading-relaxed text-taupe-600">{description}</p>

      <Link
        to={link}
        className="
          mt-6 inline-block
          rounded-lg
          bg-taupe-700
          px-5 py-3
          font-medium
          text-white
          transition
          hover:bg-taupe-600
        "
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default HomeCard;
