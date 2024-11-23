import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* <div className="flex flex-col w-full"> */}
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((item) => {
            const Page = item.component;

            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else if (item.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((item) => {
            if (!isAuth) {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Navigate key={item.path} to="/" />}
                />
              );
            }

            const Page = item.component;

            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else if (item.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
