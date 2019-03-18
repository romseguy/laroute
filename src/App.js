import React, { useState, useEffect, useContext } from "react";
import { BootstrapBaseCss } from "styled-base-components";
import { Normalize } from "styled-normalize";
import { Router, Link, navigate, Location } from "@reach/router";
import { Flex, Box, Button, Heading } from "rebass";
import { Container } from "styled-container-component";
import styled from "styled-components";
import { Reset } from "styled-reset";
import useFauna from "hooks/useFauna";
import useNetlifyIdentity from "hooks/useNetlifyIdentity";
import { FaunaCtx, UserCtx } from "contexts";
import { NavbarLight } from "./components/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import * as Sessions from "./pages/Sessions";

const NotFound = () => (
  <div>
    <h2>Page introuvable</h2>
    <p>Désolé, il n'y a rien ici.</p>
    <Link to="/home">Cliquez pour revenir à l'accueil.</Link>
  </div>
);

const AppStyles = styled.div`
  font-family: ${props => props.theme.container.fontFamily.default};
`;

export default function App(props) {
  const fauna = useFauna();
  const { load, onAuthChange, getServerLists } = fauna;
  const identity = useNetlifyIdentity(faunadb_token => {
    onAuthChange(faunadb_token).then(_client => {
      if (_client) load(getServerLists(_client));
    });
  });

  return (
    <FaunaCtx.Provider value={fauna}>
      <UserCtx.Provider value={identity}>
        <Normalize />
        <BootstrapBaseCss />
        <AppStyles>
          <Location>
            {({ location }) => {
              return <NavbarLight location={location} title="NOM DU SITE" />;
            }}
          </Location>

          <Router>
            <Landing path="/" />

            <Sessions.Wrapper path="sessions">
              <Sessions.Before path="avant" />
              <Sessions.After path="apres" />
              <NotFound default />
            </Sessions.Wrapper>

            <Home path="/accueil" />

            <NotFound default />
          </Router>
        </AppStyles>
        {/* {identity.user && (
            <Router>
              <AllLists path="/" />
              <Wrapper path="list">
                <List path=":listId" />
                <List path=":listId/active" />
                <List path=":listId/completed" />
                <NotFound default />
              </Wrapper>
              <NotFound default />
            </Router>
          )} */}
      </UserCtx.Provider>
    </FaunaCtx.Provider>
  );
}

// import Footer from "./components/Footer";
// import Spinner from "./components/Spinner";
// import InputArea from "./components/InputArea";
// import TodoItem from "./components/TodoItem";
//
// function List(props) {
//   const {
//     fetchList,
//     isLoading,
//     client,
//     addTodo,
//     toggle,
//     destroy,
//     load,
//     clearCompleted,
//     save
//   } = useContext(FaunaCtx);
//   const [state, setState] = useState(null);
//   const { listId, uri } = props;
//   const pathFlag = props.path.split("/")[1] || "all";

//   const shownTodos =
//     state &&
//     state.todos &&
//     {
//       all: state.todos,
//       active: state.todos.filter(todo => !todo.data.completed),
//       completed: state.todos.filter(todo => todo.data.completed)
//     }[pathFlag];
//   useEffect(
//     () =>
//       client &&
//       void fetchList(listId)
//         .then(setState)
//         .catch(err => console.log({ err }) || setState({ err })),
//     [client]
//   );
//   const [editing, setEditing] = useState(null);
//   const edit = todo => () => setEditing(todo.ref);
//   const onClearCompleted = () =>
//     load(clearCompleted(state.list, listId).then(setState));
//   return (
//     <div>
//       {(isLoading || !state || !state.list) && <Spinner />}
//       <div className="listNav">
//         <label>List: {state && state.list.data.title}</label>
//         <button onClick={() => navigate("/")}>back to all lists</button>
//       </div>
//       <ul className="todo-list">
//         {state && state.err ? (
//           <div>{JSON.stringify(state.err, null, 2)} </div>
//         ) : (
//           shownTodos &&
//           shownTodos.map(todo => {
//             const handle = fn => () => load(fn(todo, listId).then(setState));
//             return (
//               <TodoItem
//                 key={todo.ref.value.id}
//                 todo={todo.data}
//                 onToggle={handle(toggle)}
//                 onDestroy={handle(destroy)}
//                 onEdit={edit(todo)}
//                 editing={editing === todo.ref}
//                 onSave={val => handle(save(val))()}
//                 onCancel={console.log}
//               />
//             );
//           })
//         )}
//       </ul>
//       <InputArea
//         onSubmit={title =>
//           load(addTodo(state.list, listId)(title).then(setState))
//         }
//         placeholder="Add a new item to your list."
//       />

//       {state && state.todos && (
//         <Footer
//           count={shownTodos.length}
//           completedCount={
//             state.todos.filter(todo => todo.data.completed).length
//           }
//           onClearCompleted={onClearCompleted}
//           nowShowing={pathFlag}
//           uri={uri
//             .split("/")
//             .slice(0, 3)
//             .join("/")}
//         />
//       )}
//     </div>
//   );
// }
// function AllLists() {
//   const { lists, isLoading, addList, load, getServerLists } = useContext(
//     FaunaCtx
//   );
//   const onSubmit = title => load(addList(title));
//   return (
//     <div>
//       <div className="listNav">
//         <label>Choose a list.</label>
//       </div>
//       <section className="main">
//         {isLoading && <Spinner />}
//         <ul className="todo-list">
//           {lists.map(({ data, ref }) => {
//             return (
//               <li key={ref.value.id}>
//                 {/* <label onClick={() => alert('go')}>{data.title}</label> */}
//                 <label>
//                   <Link to={`/list/${ref.value.id}`}>{data.title}</Link>
//                 </label>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//       <InputArea
//         onSubmit={onSubmit}
//         placeholder="Create a new list or choose from above."
//       />
//     </div>
//   );
// }

// const Wrapper = props => props.children;
