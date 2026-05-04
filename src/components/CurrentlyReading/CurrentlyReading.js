import "./CurrentlyReading.css";
import { renderStars } from "../../utils/utils";

const CurrentlyReading = ({ comic }) => {
  if (!comic) {
    return null;
  }

  const coverArtSrc = comic.COVER_ART
    ? `http://localhost:5000${comic.COVER_ART}`
    : "/images/defaultcover.webp";

  const hasRating = comic.RATING != null && comic.RATING > 0;
  const hasCharacters =
    Array.isArray(comic.KEY_CHARACTERS) && comic.KEY_CHARACTERS.length > 0;

  return (
    <section
      className="currently-reading-section"
      aria-labelledby="currently-reading-title"
    >
      <div className="currently-reading-header">
        <span className="currently-reading-kicker">Featured Shelf</span>
        <h2 id="currently-reading-title" className="currently-reading-title">
          Currently Reading
        </h2>
      </div>

      <div className="currently-reading-card">
        <div className="currently-reading-cover-wrap">
          <img
            className="currently-reading-cover"
            src={coverArtSrc}
            alt={`${comic.TITLE} cover art`}
            loading="lazy"
          />
          <div className="currently-reading-ribbon">Reading Now</div>
        </div>

        <div className="currently-reading-body">
          <div className="currently-reading-topline">
            <p className="currently-reading-era">{comic.ERA}</p>
            <div className="currently-reading-meta-pills">
              {comic.PURCHASE_STATUS && (
                <span
                  className={`currently-reading-pill purchase ${comic.PURCHASE_STATUS.toLowerCase().replace(
                    /\s+/g,
                    "-",
                  )}`}
                >
                  {comic.PURCHASE_STATUS}
                </span>
              )}
              {comic.HARDCOVER && (
                <span
                  className={`currently-reading-pill format ${comic.HARDCOVER.toLowerCase()}`}
                >
                  {comic.HARDCOVER}
                </span>
              )}
              {comic.EVENT && (
                <span className="currently-reading-pill event">Event</span>
              )}
            </div>
          </div>

          <h3 className="currently-reading-book-title">
            {comic.TITLE}
            {comic.YEAR ? (
              <span className="currently-reading-book-year">{comic.YEAR}</span>
            ) : null}
          </h3>

          <div className="currently-reading-stat-row">
            <div className="currently-reading-stat">
              <span className="currently-reading-stat-label">Rating</span>
              <span className="currently-reading-stat-value rating">
                {hasRating ? renderStars(comic.RATING) : "Not Rated"}
              </span>
            </div>
            {comic.PAGES ? (
              <div className="currently-reading-stat">
                <span className="currently-reading-stat-label">Pages</span>
                <span className="currently-reading-stat-value">
                  {Number(comic.PAGES).toLocaleString()}
                </span>
              </div>
            ) : null}
            {comic.RELEASE_DATE ? (
              <div className="currently-reading-stat">
                <span className="currently-reading-stat-label">Release</span>
                <span className="currently-reading-stat-value">
                  {comic.RELEASE_DATE}
                </span>
              </div>
            ) : null}
          </div>

          {comic.LINK && (
            <a
              href={comic.LINK}
              className="currently-reading-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy On Amazon
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CurrentlyReading;
