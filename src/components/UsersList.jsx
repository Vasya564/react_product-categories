import User from './User';

const UsersList = ({ usersFromServer, filterUser, setFilterUser }) => (
  <>
    {usersFromServer.map(user => (
      <User
        key={user.id}
        user={user}
        filterUser={filterUser}
        setFilterUser={setFilterUser}
      />
    ))}
  </>

);

export default UsersList;
