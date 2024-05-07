export const SearchPannel = ({ params, setParams, users }) => {
  return (
    <form>
      <input
        type="text"
        value={params.name}
        onChange={(evt) => setParams({ ...params, name: evt.target.value })}
      />
      <select
        name=""
        id=""
        value={params.personId}
        onChange={(evt) => setParams({ ...params, personId: evt.target.value })}
      >
        <option value={""}>负责人</option>
        {users?.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
