import classNames from 'classnames';

const Category = ({ category, filterCategories, handleSwitchCategory }) => (
  <a
    data-cy="Category"
    className={classNames('button mr-2 my-1', {
      'is-info': filterCategories.includes(category.title),
    })}
    href="#/"
    onClick={() => handleSwitchCategory(category.title)}
  >
    {category.title}
  </a>
);

export default Category;
