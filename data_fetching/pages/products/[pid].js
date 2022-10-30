import React, { Fragment } from 'react';
import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage(props) {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
}

// 동적 페이지의 어떤 인스턴스를 생성할지 NextJS 에 알리기 위함
export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product) => product.id);
    const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathWithParams,
        fallback: true,
        // 방문율이 높은 페이지는 paths 에 추가 하여 사전 렌더링 시킴
    };
}

export default ProductDetailPage;
