import "semantic-ui-css/semantic.min.css";
import "../frontend/styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../frontend/store";
import Main from '../frontend/components/Main';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </Provider>
  );
}