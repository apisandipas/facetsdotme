import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "@facets/ui";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link rel="icon" href="/favicon.ico?v=2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
