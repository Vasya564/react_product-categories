/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import ProductTable from './components/ProductTable';
import SearchField from './components/SearchField';
import NoMatchingMessage from './components/NoMatchingMessage';
import FilterAllUsers from './components/FilterAllUsers';
import AllCategories from './components/AllCategories';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(findCategory => findCategory.id === product.categoryId);
  const user = usersFromServer
    .find(findUser => findUser.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const prepareProducts = (data, options) => {
  const { filterUser, searchQuery, filterCategories } = options;
  const preparedProducts = [...data];

  return preparedProducts.filter((product) => {
    const matchFilterUser = !filterUser
      || filterUser === 'All'
      || product.user.name === filterUser;
    const matchSearchQuery = !searchQuery
      || product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const matchFilterCategories = !filterCategories
      || filterCategories.includes('All')
      || filterCategories
        .some(category => product.category.title.includes(category));

    return matchFilterUser && matchSearchQuery && matchFilterCategories;
  });
};

export const App = () => {
  const [filterUser, setFilterUser] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategories, setFilterCategories] = useState(['All']);

  const filteredProducts = prepareProducts(
    products,
    { filterUser, searchQuery, filterCategories },
  );

  const resetFilters = () => {
    setFilterUser('All');
    setSearchQuery('');
    setFilterCategories(['All']);
  };

  const handleSwitchCategory = (title) => {
    setFilterCategories((list) => {
      if (filterCategories.includes(title)) {
        const filtered = list.filter(name => name !== title);

        return filtered.length < 1 ? ['All'] : filtered;
      }

      return list.filter(name => name !== 'All').concat(title);
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <FilterAllUsers
              usersFromServer={usersFromServer}
              filterUser={filterUser}
              setFilterUser={setFilterUser}
            />

            <div className="panel-block">
              <SearchField
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <AllCategories
              filterCategories={filterCategories}
              setFilterCategories={setFilterCategories}
              categoriesFromServer={categoriesFromServer}
              handleSwitchCategory={handleSwitchCategory}
            />

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!filteredProducts.length
            ? <NoMatchingMessage />
            : <ProductTable filteredProducts={filteredProducts} />
          }
        </div>
      </div>
    </div>
  );
};
