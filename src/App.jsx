/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

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
  let preparedProducts = [...data];

  if (filterUser) {
    preparedProducts = preparedProducts.filter((product) => {
      if (filterUser === 'All') {
        return true;
      }

      return product.user.name === filterUser;
    });
  }

  if (searchQuery) {
    const preparedQuery = searchQuery.toLowerCase().trim();

    preparedProducts = preparedProducts.filter(product => (
      product.name.toLowerCase().includes(preparedQuery)
    ));
  }

  if (filterCategories) {
    if (!filterCategories.includes('All')) {
      preparedProducts = preparedProducts.filter(product => filterCategories
        .some(category => product.category.title.includes(category)));
    }
  }

  return preparedProducts;
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
    if (filterCategories.includes(title)) {
      setFilterCategories((list) => {
        const filtered = list.filter(name => name !== title);

        if (filtered.length < 1) {
          return ['All'];
        }

        return filtered;
      });
    } else {
      setFilterCategories((list) => {
        const filtered = list.filter(name => name !== 'All');

        return [...filtered, title];
      });
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames({
                  'is-active': filterUser === 'All',
                })}
                onClick={() => setFilterUser('All')}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={classNames({
                    'is-active': user.name === filterUser,
                  })}
                  onClick={() => setFilterUser(user.name)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery && (
                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
                )}
              </p>
            </div>

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

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={classNames('button mr-2 my-1', {
                    'is-info': filterCategories.includes(category.title),
                  })}
                  href="#/"
                  key={category.id}
                  onClick={() => handleSwitchCategory(category.title)}
                >
                  {category.title}
                </a>
              ))}
            </div>

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
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            ) : (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID
                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product
                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category
                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User
                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={classNames({
                          'has-text-link': product.user.sex === 'm',
                          'has-text-danger': product.user.sex === 'f',
                        })}
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    </div>
  );
};
