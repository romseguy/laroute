import React from "react";

import { useLoading, useProduceState } from "@swyx/hooks";
const faunadb = require("faunadb");
const q = faunadb.query;

export default function useFauna() {
  const [isLoading, load] = useLoading();
  const [client, setClient] = useProduceState(null, onClientChange);

  const onAuthChange = async faunadb_token => {
    if (!faunadb_token) return null;

    const _client = new faunadb.Client({
      secret: faunadb_token
    });

    setClient(_client);
    return _client;
  };

  const onClientChange = (_client = client) => {
    if (!_client) return null;

    // return new Promise(resolve => setTimeout(resolve, 2000));
    return Promise.resolve();
  };

  const addSessionRegistration = session => sessionRegistration => {
    let newSessionRegistration = {
      ...sessionRegistration,
      session: session.id
    };

    // const me = q.Identity();
    const me = q.Select("ref", q.Get(q.Ref("classes/users/self")));
    newSessionRegistration.user = me;

    return client.query(
      q.Create(q.Ref("classes/sessionRegistrations"), {
        data: newSessionRegistration,
        permissions: {
          //read: q.Ref("classes/users"),
          read: q.Class("users"),
          //read: "public",
          write: me
        }
      })
    );
  };

  const unwrapUsers = async data => {
    data = data.map(({ data }) => data);

    const userPromises = data.map(row => {
      return client.query(q.Get(row.user)).then(user => {
        return user.data;
      });
    });

    const users = await Promise.all(userPromises);

    return data.map((row, index) => {
      return {
        ...row,
        user: users[index]
      };
    });
  };

  const listSessionRegistrations = async () => {
    if (client) {
      let { data } = await client.query(
        q.Map(q.Paginate(q.Match(q.Index("all_sessionRegistrations"))), ref =>
          q.Get(ref)
        )
      );

      return unwrapUsers(data);
    }
  };

  const getSessionRegistrations = async sessionId => {
    if (client) {
      let { data } = await client.query(
        q.Map(
          q.Paginate(
            q.Match(
              q.Index("sessionRegistration_by_session"),
              Number(sessionId)
            )
          ),
          ref => q.Get(ref)
        )
      );

      console.log("???", data);
      return unwrapUsers(data);
    }
  };

  return {
    client,
    addSessionRegistration,
    getSessionRegistrations,
    listSessionRegistrations,
    onAuthChange,
    onClientChange,
    load,
    isLoading
  };
}

/*
function useFaunaBack() {
  const [lists, setLists] = React.useState([]);
  const [isLoading, load] = useLoading();
  const onAuthChange = async faunadb_token => {
    if (!faunadb_token) return null;
    const _client = new faunadb.Client({
      secret: faunadb_token
    });
    setClient(_client);
    return _client;
  };

  function getServerLists(_client = client) {
    if (!_client) return null;

    return _client
      .query(
        q.Map(
          q.Paginate(
            q.Match(
              // todo use lists_by_owner
              q.Ref("indexes/all_lists")
            )
          ),
          ref => q.Get(ref)
        )
      )
      .then(r => {
        if (r.data.length === 0) {
          // create the first list for the user
          const me = q.Select("ref", q.Get(q.Ref("classes/users/self")));

          return client
            .query(
              q.Create(q.Class("lists"), {
                data: {
                  title: "Default Todo List",
                  owner: q.Select("ref", q.Get(q.Ref("classes/users/self")))
                },
                permissions: {
                  read: me,
                  write: me
                }
              })
            )
            .then(defaultList => setLists([defaultList]));
        } else {
          setLists(r.data);
        }
      });
  }

  const fetchList = async id => {
    if (client) {
      const _list = await client.query(q.Get(q.Ref("classes/lists/" + id)));
      const resp = await client.query(
        q.Map(q.Paginate(q.Match(q.Index("todos_by_list"), _list.ref)), ref =>
          q.Get(ref)
        )
      );
      return { list: _list, todos: resp.data };
    }
  };

  const addList = title => {
    var newList = { title };
    const me = q.Select("ref", q.Get(q.Ref("classes/users/self")));
    newList.owner = me;
    return client
      .query(
        q.Create(q.Class("lists"), {
          data: newList,
          permissions: {
            read: me,
            write: me
          }
        })
      )
      .then(() => getServerLists(client));
  };

  // const addSessionRegistration = (session, id) =>

  const addTodo = (list, id) => title => {
    var newTodo = {
      title: title,
      list: list.ref,
      completed: false
    };

    const me = q.Select("ref", q.Get(q.Ref("classes/users/self")));
    newTodo.user = me;
    return client
      .query(
        q.Create(q.Ref("classes/todos"), {
          data: newTodo,
          permissions: {
            read: me,
            write: me
          }
        })
      )
      .then(() => fetchList(id));
  };

  // const toggleAll = (checked, list) => {
  //   return client.query(
  //     q.Map(q.Paginate(q.Match(q.Index('todos_by_list'), list.ref)), ref =>
  //       q.Update(q.Select('ref', q.Get(ref)), {
  //         data: {
  //           completed: q.Not(q.Select(['data', 'completed'], q.Get(ref)))
  //         }
  //       })
  //     )
  //   );
  // };

  const toggle = (todoToToggle, id) => {
    return client
      .query(
        q.Update(todoToToggle.ref, {
          data: {
            completed: !todoToToggle.data.completed
          }
        })
      )
      .then(() => fetchList(id));
  };

  const destroy = (todo, id) =>
    client.query(q.Delete(todo.ref)).then(() => fetchList(id));

  const save = text => (todoToSave, id) => {
    return client
      .query(
        q.Update(todoToSave.ref, {
          data: { title: text }
        })
      )
      .then(() => fetchList(id));
  };

  const clearCompleted = (list, id) => {
    return client
      .query(
        q.Map(q.Paginate(q.Match(q.Index("todos_by_list"), list.ref)), ref =>
          q.If(
            q.Select(["data", "completed"], q.Get(ref)),
            q.Delete(q.Select("ref", q.Get(ref))),
            true
          )
        )
      )
      .then(() => fetchList(id));
  };
  return {
    lists,
    // list,
    fetchList,
    addList,
    addTodo,
    // toggleAll,
    getServerLists,
    load,
    toggle,
    destroy,
    save,
    clearCompleted,
    onAuthChange,
    isLoading,
    client
  };
}
*/
