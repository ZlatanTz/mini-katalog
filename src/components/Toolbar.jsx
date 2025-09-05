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
    <div className={styles.toolbar}>
      <input
        type="search"
        name="search-bar"
        className={styles['search-bar']}
        value={query ?? ''}
        onChange={(e) => {
          onQueryChange(e.target.value);
        }}
        placeholder="Search products..."
      />

      <label className={styles['featured-checkbox-container']}>
        <input
          type="checkbox"
          name="featured-checkbox"
          className={styles['featured-checkbox']}
          checked={featuredOnly ?? false}
          onChange={(e) => {
            onFeaturedChange(e.target.checked);
          }}
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
