/* eslint-disable @typescript-eslint/camelcase */
import {
  addStyleForMobile,
  addStyleForTablet,
  ThemeProps,
  Typography,
} from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

// to have the brand images look proportial with differing aspect ratios, manually setting one of these values per brand
const maxHeight = ({ max_height }: { max_height?: number }): string =>
  max_height ? `${max_height}px` : 'none';
const maxWidth = ({ max_width }: { max_width?: number }): string =>
  max_width ? `${max_width}px` : 'none';

// quickest way to do this
const maxHeightMobile = ({ max_height }: { max_height?: number }): string =>
  max_height ? `${Math.round(max_height * 0.85)}px` : 'none';
const maxWidthMobile = ({ max_width }: { max_width?: number }): string =>
  max_width ? `${Math.round(max_width * 0.85)}px` : 'none';

const Container = styled.div`
  margin: 64px;

  ${addStyleForMobile(`
    margin: 48px 16px;
    
    & div:nth-child(2) > h4{
      margin-bottom: 16px;
    };

    & div:nth-child(3) > h4{
      margin-left: 0;
      text-align: left;
    };
`)};
`;

const Section = styled.div`
  margin-bottom: 64px;
`;

const Title = styled(Typography.Heading.Four)`
  color: ${primaryBrand};
  margin-bottom: 32px;
  ${addStyleForMobile(`
    margin: 32px 16px;
    text-align: center;
    margin-top: 0;
`)};
`;
const Link = styled(Typography.Body.Regular)`
  text-decoration: underline;
  &:hover {
    color: ${primaryBrand};
  }
`;

const VehicleImageContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  ${addStyleForMobile(`
  flex-direction: column;
`)};
`;

const VehicleTile = styled.a`
  flex: 1 1 0;
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    span {
      color: ${primaryBrand};
    }
  }
  & img {
    width: 100%;
    margin-bottom: 8px;
  }
  ${addStyleForMobile(`
    margin-bottom: 32px;
  &:last-of-type {
    margin-bottom: 0;
  }
  `)}
`;
const BrandImageContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`;

const BrandTile = styled.a`
  flex-basis: calc(16.66% - 32px);
  padding: 0 16px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin: 16px;
  &:hover {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }
  & img {
    width: 100%;
  }
  ${addStyleForTablet(`
  flex-basis: calc(25% - 32px);
`)}
  ${addStyleForMobile(`
  flex-basis: calc(50% - 32px);
`)}
`;

// maintain 3:1 aspect ratio of flex items when resizing
const BrandTileInner = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  padding-top: 66.66%;
`;

interface BrandImageProps {
  max_height?: number;
  max_width?: number;
}

// addStyleForMobile not working properly with functions here
const BrandImage = styled('img')<BrandImageProps>`
  max-height: ${maxHeight};
  max-width: ${maxWidth};
  @media (max-width: 599px) {
    max-height: ${maxHeightMobile};
    max-width: ${maxWidthMobile};
  }

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
`;

const ModelLinkContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  flex-direction: column;
  max-height: 240px;
  @media (max-width: 1240px) {
    max-height: 360px;
  }
  ${addStyleForTablet(`
    max-height: 480px;
  `)}
  ${addStyleForMobile(`
    max-height: 720px;
  `)}
`;
const ModelLinkTile = styled.a`
  align-self: flex-start;
  margin-bottom: 16px;
`;

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const {
    title_vehicle,
    vehicles,
    title_brand,
    brands,
    title_model,
    models,
    handleLinkClick,
  } = viewModel;
  return (
    <Container>
      <Section>
        <Title>{title_vehicle}</Title>
        <VehicleImageContainer>
          {vehicles.map((vehicle) => (
            <VehicleTile
              onClick={handleLinkClick(vehicle.link.label, vehicle.link.href)}
              key={vehicle.img_url}
            >
              <img src={vehicle.img_url} />
              <Link>{vehicle.link.label}</Link>
            </VehicleTile>
          ))}
        </VehicleImageContainer>
      </Section>

      <Section>
        <Title>{title_brand}</Title>
        <BrandImageContainer>
          {brands.map((brand) => (
            <BrandTile
              onClick={handleLinkClick(brand.name, brand.href)}
              key={brand.name}
            >
              <BrandTileInner>
                <BrandImage
                  src={brand.image.img_url}
                  max_height={brand.image.max_height}
                  max_width={brand.image.max_width}
                />
              </BrandTileInner>
            </BrandTile>
          ))}
        </BrandImageContainer>
      </Section>

      <Section>
        <Title>{title_model}</Title>
        <ModelLinkContainer>
          {models.map((model) => (
            <ModelLinkTile
              onClick={handleLinkClick(model.label, model.href)}
              key={model.label}
            >
              <Link>{model.label}</Link>
            </ModelLinkTile>
          ))}
        </ModelLinkContainer>
      </Section>
    </Container>
  );
};

export default observer(HeroView);
