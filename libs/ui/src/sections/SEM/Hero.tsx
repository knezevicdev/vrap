import React from 'react';
import styled from 'styled-components';

import { Hero as TypographyHero } from '../../atoms/Typography';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const Image = styled.div`
    min-height: 486px;
    background: lightgray;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 56px;
    background: gray;
`;

export interface HeroProps {
    info: {
        image: string;
        logo: string;
        title: string;
    }
}

export const Hero: React.FC<HeroProps> = ({info:{title}}) => {
    return (
        <Container>
            <Image/>
            <Header>
                <div>logo</div>
                <div>icon</div>
            </Header>
            <TypographyHero.One>
                {title}
            </TypographyHero.One>
        </Container>
    );
};
