

/*
_app.js is the root or shell of the app.

_document.js allow us to customize the entire 
html documents

*/

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <body>
                        <div id="overlays"/>
                        <Main />
                        <NextScript />
                    </body>
                </Head>
            </Html>
        );
    }
}

export default MyDocument;