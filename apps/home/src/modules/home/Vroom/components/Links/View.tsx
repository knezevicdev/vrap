/* eslint-disable @typescript-eslint/camelcase */
import {
  addStyleForMobile,
  addStyleForTablet,
  ThemeProps,
  Typography,
} from '@vroom-web/ui-lib';
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

const width = ({ width }: { width?: string }): string => width || '100%';
const flexGrow = ({ flexGrow }: { flexGrow?: string }): string =>
  flexGrow || '1';

// quickest way to do this
const maxHeightMobile = ({ max_height }: { max_height?: number }): string =>
  max_height ? `${Math.round(max_height * 0.85)}px` : 'none';
const maxWidthMobile = ({ max_width }: { max_width?: number }): string =>
  max_width ? `${Math.round(max_width * 0.85)}px` : 'none';

const Container = styled.div`
  padding: 32px 64px;
  background: #fff;
  ${addStyleForMobile(`
    padding: 48px 16px;
`)};
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Title = styled(Typography.Heading.Three)`
  color: ${primaryBrand};
  margin-bottom: 32px;
  ${addStyleForMobile(`
    margin: 16px;
    text-align: center;
    margin-top: 0;
`)};
`;

const ModelTitle = styled(Title)`
  ${addStyleForMobile(`
    margin-left: 0;
    margin-bottom: 32px;
    text-align: left;
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

interface VehicleTypeImageProps {
  flexGrow?: string;
  width?: string;
}

const VehicleTypeTile = styled('a')<VehicleTypeImageProps>`
  flex: ${flexGrow} 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: flex-end;
  padding: 0 16px;
  &:hover {
    span {
      color: ${primaryBrand};
    }
  }
  & img {
    width: 100%;
    margin-bottom: 8px;
  }
  @media (max-width: 599px) {
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: 0;
    }
    & img {
      width: 90%;
      width: ${width};
    }
  }
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
  cursor: pointer;
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
  cursor: pointer;
`;

interface Props {
  viewModel: ViewModel;
}

const LinksTypeView: React.FC<Props> = ({ viewModel }) => {
  const { title_vehicle, vehicles, handleLinkClick } = viewModel;
  return (
    <Container>
      <Section>
        <Title>{title_vehicle}</Title>
        <VehicleImageContainer>
          {vehicles.map((vehicle) => (
            <VehicleTypeTile
              onClick={handleLinkClick(vehicle.link.label, vehicle.link.href)}
              href={vehicle.link.href}
              key={vehicle.img_url}
              width={vehicle.width}
              flexGrow={vehicle.flexGrow}
            >
              <img
                src={vehicle.img_url}
                alt={`${vehicle.img_alt}`}
                loading="lazy"
              />
              <Link>{vehicle.link.label}</Link>
            </VehicleTypeTile>
          ))}
        </VehicleImageContainer>
      </Section>
    </Container>
  );
};

const LinksMakeView: React.FC<Props> = ({ viewModel }) => {
  const { title_brand, brands, handleLinkClick } = viewModel;
  return (
    <Container>
      <Section>
        <Title>{title_brand}</Title>
        <BrandImageContainer>
          {brands.map((brand) => (
            <BrandTile
              onClick={handleLinkClick(brand.name, brand.href)}
              href={brand.href}
              key={brand.name}
            >
              <BrandTileInner>
                <BrandImage
                  src={brand.image.img_url}
                  max_height={brand.image.max_height}
                  max_width={brand.image.max_width}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                />
              </BrandTileInner>
            </BrandTile>
          ))}
        </BrandImageContainer>
      </Section>
    </Container>
  );
};

const LinksModelView: React.FC<Props> = ({ viewModel }) => {
  const { title_model, models, handleLinkClick } = viewModel;
  return (
    <Container>
      <Section>
        <ModelTitle>{title_model}</ModelTitle>
        <ModelLinkContainer>
          {models.map((model) => (
            <ModelLinkTile
              onClick={handleLinkClick(model.label, model.href)}
              href={model.href}
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

export { LinksTypeView, LinksMakeView, LinksModelView };
