import React, { useState, useEffect, useContext } from "react";
import { BootstrapBaseCss } from "styled-base-components";
import { Normalize } from "styled-normalize";
import { Router, Link, navigate, Location } from "@reach/router";
import { Flex, Box, Button, Heading } from "rebass";
import { Container } from "styled-container-component";
import styled from "styled-components";
import { Reset } from "styled-reset";
import useFauna from "./hooks/useFauna";
import useNetlifyIdentity from "./hooks/useNetlifyIdentity";
import { FaunaCtx, UserCtx } from "./contexts";
import { NavbarLight } from "./components/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import * as Sessions from "./pages/Sessions";
import LoginButton from "./components/LoginButton";

const NotFound = () => (
  <div>
    <h2>Page introuvable</h2>
    <p>Désolé, il n'y a rien ici.</p>
    <Link to="/home">Cliquez pour revenir à l'accueil.</Link>
  </div>
);

const AppContainer = styled.div`
  font-family: ${props => props.theme.container.fontFamily.default};
  max-width: ${props => props.theme.screenSize.md};
  margin: 0 auto;
`;

const AdminRoute = ({ as: Comp, ...props }) => {
  const identity = useContext(UserCtx);
  if (!identity.user) {
    if (localStorage.getItem("faunaNetlifyUser")) {
      return <span>Chargement...</span>;
    } else {
      navigate("/accueil");
      return <Home />;
    }
  } else {
    if (
      !identity.user.app_metadata.roles ||
      identity.user.app_metadata.roles.indexOf("admin") === -1
    ) {
      navigate("/accueil");
      return <Home />;
    }
    return <Comp {...props} />;
  }
};

const PrivateRoute = ({ as: Comp, ...props }) => {
  const identity = useContext(UserCtx);
  if (!identity.user) {
    if (localStorage.getItem("faunaNetlifyUser")) {
      return <span>Chargement...</span>;
    } else {
      navigate("/accueil");
      return <Home />;
    }
  } else {
    return <Comp {...props} />;
  }
};

export default function App(props) {
  const fauna = useFauna();
  const { load, isLoading, onAuthChange, onClientChange } = fauna;

  const identity = useNetlifyIdentity(faunadb_token => {
    onAuthChange(faunadb_token).then(_client => {
      if (_client) {
        return load(onClientChange(_client));
      }
    });
  });

  console.log(identity.user);

  return (
    <FaunaCtx.Provider value={fauna}>
      <UserCtx.Provider value={identity}>
        <Normalize />
        <BootstrapBaseCss />

        <Location>
          {({ location }) => {
            return (
              <AppContainer>
                <Flex alignItems="center" my={2}>
                  <Heading>Sur les chemins du partage</Heading>
                  <Box mx="auto" />
                  {location.pathname !== "/" && <LoginButton />}
                </Flex>

                <NavbarLight
                  location={location}
                  image={require("./assets/banner.jpg")}
                />

                <Router>
                  <Landing path="/" />

                  <Sessions.Wrapper path="sessions">
                    <Sessions.Before path="avant" />
                    <Sessions.After path="apres" />
                    <AdminRoute as={Sessions.Registrations} path="demandes" />
                    <NotFound default />
                  </Sessions.Wrapper>

                  <Home path="/accueil" />

                  <NotFound default />
                </Router>
              </AppContainer>
            );
          }}
        </Location>
      </UserCtx.Provider>
    </FaunaCtx.Provider>
  );
}

/* {identity.user && (
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
)} */

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
