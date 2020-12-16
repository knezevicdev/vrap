import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import LoggedOut from './LoggedOut';
import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import { Body } from 'src/core/Typography';

interface Props {
  viewModel: ViewModel;
}

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerText = styled(Body.Regular)`
  color: #e7131a;
  cursor: pointer;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
`;

const FavoriteSection = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FavoritesView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  if (viewModel.isLoading()) {
    return null;
  }

  return (
    <Container>
      <ContainerText onClick={viewModel.handleFavoritesClicked}>
        {viewModel.isFavorited() ? (
          <FavoriteSection>
            <Icon icon={Icons.FAVORITE_FILLED} /> {viewModel.favorited}
          </FavoriteSection>
        ) : (
          <FavoriteSection>
            <Icon icon={Icons.FAVORITE_OUTLINED} />
            {viewModel.addToFavorites}
          </FavoriteSection>
        )}
      </ContainerText>
      <LoggedOut viewModel={viewModel} />
    </Container>
  );
};
export default observer(FavoritesView);
