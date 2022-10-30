## react 단점

-   pre-rendering x
-   검포넌트가 렌더링 되고 나서 서버로 api 요청을 한다
-   검색엔진이 인덱싱하기 어렵다(블로그, 쇼핑몰 등 필요할 시)

## 프리랜더링 정적 생성

-   두가지 방법으로 나뉨: Static Generation / Server-side Rendering
-   함수가 실행된느 시점에 따라 나누는 것
-   빌드 시에 페이지를 만든다
-   프리랜더링은 컴포넌트의 함수보다 먼저 실행된다 (getStaticProps)

## Incremental Static Generation

-   특정 시간이 지나기 전까지는 초기 페이지를 보여주고
    이후에는 지난 페이지 보여줌

npm start: build 한 파일을 보는 것 npm run dev 랑 다름

## getStaticProps

-   데이터 패칭 실패 시 redirect, destination 또는 validate 를 사용하여 예외 처리를 할 수 있다.

```
export async function getStaticProps() {
    console.log('re-generating');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    if (data.products.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}
```

-   동적 세그먼트를 사용 시는 ssp Path 추가해줘야 한다
-   어떤 인스턴스가 사용되는 지 알려줘야 한다
-   어떤 값에 대한 사전페이지를 생성할지
-   이에 대한 해답이 비동기 함수인 getStaticPaths()

```
// 예시
// 동적 페이지의 어떤 인스턴스를 생성할지 NextJS 에 알리기 위함
export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    pid: 'p1',
                },
            },
        ],
        fallback: 'blocking',
        // 방문율이 높은 페이지는 paths 에 추가 하여 사전 렌더링 시킴
    };
}
```

## Server-side Rendering

-   서버로 부터 오는 요청이 들어올 때마다 실행
-   getServerSideProps 사용함 (getStaticProps 랑 둘 중에 하나만 사용해야 함, 충동시킴)

## Client-side Data Fetching

-   pre-render 기능이 필요하지 않은 경우
-   주식 : 실시간으로 데이터가 변경되므로 사전 렌더링 데이터가 과거가 될 수 있다
-   유저 프로필: 검색엔진에 포함될 필요 없다
-   대시보드: 너무 많은 데이터를 가져와야 하므로 오래걸린다
