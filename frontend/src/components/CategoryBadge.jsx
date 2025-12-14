const CategoryBadge = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
    >
      {category?.name || 'Uncategorized'}
    </button>
  );
};

export default CategoryBadge;

