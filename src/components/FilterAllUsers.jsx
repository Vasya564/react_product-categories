import classNames from 'classnames';
import UsersList from './UsersList';

const FilterAllUsers = ({ filterUser, setFilterUser, usersFromServer }) => (
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

    <UsersList
      usersFromServer={usersFromServer}
      filterUser={filterUser}
      setFilterUser={setFilterUser}
    />
  </p>

);

export default FilterAllUsers;
