import classNames from 'classnames';

const User = ({ user, filterUser, setFilterUser }) => (
  <a
    data-cy="FilterUser"
    href="#/"
    className={classNames({
      'is-active': user.name === filterUser,
    })}
    onClick={() => setFilterUser(user.name)}
  >
    {user.name}
  </a>
);

export default User;
