import React from 'react';
import { StyledComponent } from './home.style'

const Home = () => {
    return (
        <div>
            <StyledComponent>
                <h1>Home Pooo</h1>
                
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </StyledComponent>
        </div>
    )
}

export default Home;