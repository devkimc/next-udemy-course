import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang='kr'>
                <Head />
                <body>
                    <div id='overlays' />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

// 필수 입력 사항
// class MyDocument extends Document {
//     render() {
//         return (
//             <Html lang='kr'>
//                 <Head />
//                 <body>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         );
//     }
// }

// export default MyDocument;
