import React from 'react';
import Image from 'next/image';

import classes from './hero.module.css';

function Hero(props) {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src='/images/site/rabbit.jpg'
                    alt='showing ws'
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm ws</h1>
            <p>I am blog manager. nice to meet you</p>
        </section>
    );
}

export default Hero;
