import React from 'react';
import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, TitleContainer, SubTitleContainer } from './menu-item.styles';

const MenuItem = ({title, imageUrl, size, history, match, linkUrl}) =>(

    <MenuItemContainer size={size} onClick ={ () => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImageContainer className='background-image' imageUrl={imageUrl}/>
    <ContentContainer className='content'>
        <TitleContainer>{title.toUpperCase()}</TitleContainer>
        <SubTitleContainer>SHOP NOW</SubTitleContainer>
    </ContentContainer>
</MenuItemContainer>
)


export default withRouter(MenuItem);