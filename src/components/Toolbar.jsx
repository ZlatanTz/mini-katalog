import styles from './Toolbar.module.css';

export const Toolbar = ({
  query,
  onQueryChange,
  featuredOnly,
  onFeaturedChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div
      className={styles.toolbar}
      role="region"
      aria-label="Filters and sorting"
    >
      <input
        type="search"
        name="search-bar"
        className={styles['search-bar']}
        value={query ?? ''}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />

      <label className={styles['featured-checkbox-container']}>
        <input
          type="checkbox"
          name="featured-checkbox"
          className={styles['featured-checkbox']}
          checked={featuredOnly ?? false}
          onChange={(e) => onFeaturedChange(e.target.checked)}
          aria-label="Featured only"
        />
        Featured only
      </label>

      <select
        className={styles.select}
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort products"
      >
        <option value="price-asc">Price, low to high</option>
        <option value="price-desc">Price, high to low</option>
        <option value="rating-desc">Rating, high to low</option>
      </select>
    </div>
  );
};
