## react 단점

-   pre-rendering 지원 안됨
-   검포넌트가 렌더링 되고 나서 서버로 api 요청을 한다
-   검색엔진이 인덱싱하기 어렵다(블로그, 쇼핑몰 등 필요할 시)

## 프리랜더링 정적 생성

-   두가지 방법으로 나뉨: Static Generation / Server-side Rendering
-   함수가 실행되는 시점에 따라 나누는 것
-   빌드 시에 페이지를 만든다(npm start: build 한 파일을 실행하는 것 npm run dev 랑 다름)
-   프리랜더링은 컴포넌트의 함수보다 먼저 실행된다 (getStaticProps)

## Incremental Static Generation

-   특정 시간이 지나기 전까지는 초기 페이지를 보여주고
    이후에는 지난 페이지 보여줌

## getStaticProps

-   빌드 시 페이지를 생성
-   데이터 패칭 실패 시 redirect, destination 또는 revalidate 를 사용하여 예외 처리를 할 수 있다.

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

### getStaticPaths

-   getStaticProps 와 동적 세그먼트를 사용 시 getStaticPaths 추가해줘야 한다
-   어떤 인스턴스가 사용되는 지 / 어떤 값에 대한 사전페이지를 생성할지 알려줘야 한다

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
-   getStaticProps 랑 둘 중에 하나만 사용해야 함, 서로 페이지를 생성하므로 충돌시킴

## Client-side Data Fetching

-   pre-render 기능이 필요하지 않은 경우 사용
-   주식 : 실시간으로 데이터가 변경되므로 사전 렌더링 데이터가 과거가 될 수 있다
-   유저 프로필: 검색엔진에 포함될 필요 없다
-   대시보드: 너무 많은 데이터를 가져와야 하므로 오래걸린다

## 클라이언트 렌더링과 서버 사이드 렌더링을 선택할 것에 대한 고민

-   검색 엔진 크롤러가 이해해야 하는 페이지인가
-   페이지의 데이터가 짧은 시간에 여러 번 바뀔 가능성이 있는가
-   방문자 입장에서 즉각적으로 보여지는 게 좋은 페이지인가
-   사용자의 특정 데이터인가
