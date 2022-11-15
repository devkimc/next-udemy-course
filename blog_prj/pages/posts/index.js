import React from 'react';
import AllPosts from '../../components/posts/all-posts';

const DUMMY_POSTS = [
    {
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started with NextJS',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is the Framework for production',
        data: '2022-11-15',
    },
    {
        slug: 'getting-started-with-nextjs2',
        title: 'Getting Started with NextJS',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is the Framework for production',
        data: '2022-11-15',
    },
    {
        slug: 'getting-started-with-nextjs3',
        title: 'Getting Started with NextJS',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is the Framework for production',
        data: '2022-11-15',
    },
    {
        slug: 'getting-started-with-nextjs4',
        title: 'Getting Started with NextJS',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is the Framework for production',
        data: '2022-11-15',
    },
];

function AllPostsPage(props) {
    return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
