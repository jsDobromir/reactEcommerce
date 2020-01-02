import React from 'react';
import './homepage.styles.scss';
const HomePage = () => (
    <div className='homepage'>
        <div className='directory-menu'>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='Hats'>Hats</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='Hats'>Jackets</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='Hats'>Womens</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>

            <div className='menu-item'>
                <div className='content'>
                    <h1 className='Hats'>Men</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;