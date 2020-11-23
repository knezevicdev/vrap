import Observer from '@researchgate/react-intersection-observer';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface PicProps extends HTMLAttributes<HTMLPictureElement> {
  width: string;
  height: string;
  isLoading?: boolean;
}

const Pic = styled.picture<PicProps>`
  display: flex;
  position: relative;
  overflow: hidden;
  width: ${(props): string => props.width};
  height: 0;
  padding-bottom: ${(props): string => props.height};

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  ${(props): string | false | undefined =>
    props.isLoading &&
    `
      animation: shimmer 2s infinite;
      background: linear-gradient(235deg, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
      background-size: 1000px 100%;
    `}
`;

interface ImgProps extends HTMLAttributes<HTMLImageElement> {
  loaded: boolean;
  objectFit?: string;
  objectPosition?: string;
}

const Img = styled.img<ImgProps>`
  display: ${(props): string => (props.loaded ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${(props): string | undefined =>
    props.objectFit ? props.objectFit : undefined};
  object-position: ${(props): string | undefined =>
    props.objectPosition ? props.objectPosition : undefined};
`;

export interface BasePictureProps {
  alt: string;
  className?: string;
  objectFit?: string;
  objectPosition?: string;
  onClick?: (e: React.MouseEvent<HTMLPictureElement, MouseEvent>) => void;
  src: string;
}

export interface WidthHeightPictureProps extends BasePictureProps {
  width: string;
  height: string;
}

export interface WidthRatioPictureProps extends BasePictureProps {
  width: string;
  aspectRatio: string;
}

export type PictureProps = WidthRatioPictureProps | WidthHeightPictureProps;

export interface PictureState {
  intersecting: boolean;
  loaded: boolean;
}

const isWidthHeight = (
  props: PictureProps
): props is WidthHeightPictureProps => {
  return (
    (props as WidthHeightPictureProps).width !== undefined &&
    (props as WidthHeightPictureProps).height !== undefined
  );
};

export class Picture extends React.Component<PictureProps, PictureState> {
  private aspectRatioRegex = new RegExp('^\\d+:\\d+$');
  private onlyDigitsRegex = new RegExp('^\\d+$');

  // 0.5 -> "50%",
  private floatToPercent(fraction: number): string {
    // Limit the fraction to the range 0-1.
    const clampedFraction = Math.min(Math.max(fraction, 0), 1);
    const percent = Math.round(clampedFraction * 1e4) / 1e2;
    return `${percent}%`;
  }

  // "50%" -> 0.5
  private percentToFloat(percent: string): number {
    const percentFloat = parseFloat(percent);
    if (isNaN(percentFloat)) {
      console.error(
        'Picture could not convert invalid percent string to float'
      );
      return 0;
    }
    return percentFloat / 100.0;
  }

  private getHeightFromWidthAndAspectRatio(
    width: string,
    aspectRatio: string
  ): string {
    if (!this.aspectRatioRegex.test(aspectRatio)) {
      console.error(
        'Picture using invalid aspect ratio format. Please use the format <number>:<number>, e.g. 4:3'
      );
    }
    const aspectRatioTokens = aspectRatio.split(':');
    const aspectRatioWidthInt = parseInt(aspectRatioTokens[0]);
    const aspectRatioHeightInt = parseInt(aspectRatioTokens[1]);
    const aspectRatioValue = aspectRatioHeightInt / aspectRatioWidthInt;

    const widthIsPercent = width.includes('%');
    if (widthIsPercent) {
      // Be advised, height percentage is based on the PARENT'S width.
      // This is why additional computation is needed here.
      // https://css-tricks.com/oh-hey-padding-percentage-is-based-on-the-parent-elements-width/
      const widthFloat = this.percentToFloat(width);
      return this.floatToPercent(widthFloat * aspectRatioValue);
    }

    const widthIsAuto = width === 'auto';
    if (widthIsAuto) {
      return this.floatToPercent(aspectRatioValue);
    }

    const units = width.split(/[0-9]+/g).pop();
    const widthInt = parseInt(width, 10);
    if (isNaN(widthInt)) {
      console.error('Picture could not convert invalid width to int');
      return 'auto';
    }
    const heightInt = Math.round(widthInt * aspectRatioValue);
    return `${heightInt}${units}`;
  }

  private handleObserverChange = (entry: IntersectionObserverEntry): void => {
    if (entry.isIntersecting) {
      this.setState({ intersecting: true });
    }
  };

  private handleImageLoad = (): void => {
    this.setState({ loaded: true });
  };

  constructor(props: PictureProps) {
    super(props);

    this.state = {
      intersecting: false,
      loaded: false,
    };
  }

  render(): React.ReactNode {
    const { alt, objectFit, objectPosition, onClick, src, width } = this.props;

    const loading = this.state.intersecting && !this.state.loaded;
    const sanitizedWidth = this.onlyDigitsRegex.test(width)
      ? `${width}px`
      : width;

    const height: string = isWidthHeight(this.props)
      ? this.props.height
      : this.getHeightFromWidthAndAspectRatio(
          width,
          (this.props as WidthRatioPictureProps).aspectRatio
        );
    const sanitizedHeight = this.onlyDigitsRegex.test(height)
      ? `${height}px`
      : height;

    return (
      <Observer
        disabled={this.state.intersecting}
        onChange={this.handleObserverChange}
      >
        <Pic
          isLoading={loading}
          onClick={onClick}
          width={sanitizedWidth}
          height={sanitizedHeight}
        >
          <Img
            alt={alt}
            // TODO: use loading="lazy" when it's supported by safari, instead of intersection observer.
            objectFit={objectFit}
            objectPosition={objectPosition}
            onLoad={this.handleImageLoad}
            loaded={this.state.loaded}
            src={this.state.intersecting ? src : undefined}
          />
        </Pic>
      </Observer>
    );
  }
}
