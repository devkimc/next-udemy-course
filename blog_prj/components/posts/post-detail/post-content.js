import React from 'react';
import ReactMarkDown from 'react-markdown';
import PostHeader from './post-header';
import classes from './post-content.module.css';

const DUMMY_POST = {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with NextJS',
    image: 'getting-started-nextjs.png',
    excerpt: 'NextJS is the Framework for production',
    data: '2022-11-15',
    content: '# This is a first post',
};

function PostContent() {
    const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

    return (
        <article className={classes.content}>
            <PostHeader title={DUMMY_POST.title} image={imagePath} />
            <ReactMarkDown>{DUMMY_POST.content}</ReactMarkDown>
        </article>
    );
}

export default PostContent;
