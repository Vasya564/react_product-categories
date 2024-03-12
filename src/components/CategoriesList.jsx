import Category from './Category';

const CategoriesList = ({
  categoriesFromServer,
  filterCategories,
  handleSwitchCategory,
}) => (
  <>
    {categoriesFromServer.map(category => (
      <Category
        key={category.id}
        category={category}
        filterCategories={filterCategories}
        handleSwitchCategory={handleSwitchCategory}
      />
    ))}
  </>
);

export default CategoriesList;
