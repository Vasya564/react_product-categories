import classNames from 'classnames';
import CategoriesList from './CategoriesList';

const AllCategories = ({
  filterCategories,
  setFilterCategories,
  categoriesFromServer,
  handleSwitchCategory,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={classNames('button is-success mr-6', {
        'is-outlined': !filterCategories.includes('All'),
      })}
      onClick={() => setFilterCategories(['All'])}
    >
      All
    </a>

    <CategoriesList
      categoriesFromServer={categoriesFromServer}
      filterCategories={filterCategories}
      handleSwitchCategory={handleSwitchCategory}
    />
  </div>
);

export default AllCategories;
