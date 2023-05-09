import getConfig from 'next/config';
import { FilePond } from 'react-filepond';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.BASE_PATH;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;

  /* the background color of the filepond drop area */
  .filepond--root {
    max-width: 300px;
    height: 200px;
  }

  /* the border radius of the drop area */
  .filepond--panel-root {
    border-radius: initial;
    background-color: #ffffff;
  }

  /* the border radius of the file item */
  .filepond--item-panel {
    border-radius: initial;
  }

  .filepond--drop-label {
    margin-top: 3.5rem;
  }

  .filepond--label-action {
    background-image: url('${BASE_PATH}/images/upload.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 30px;
    margin-top: 10px;
  }

  [data-filepond-item-state*='error'] .filepond--file-info,
  [data-filepond-item-state*='invalid'] .filepond--file-info,
  [data-filepond-item-state='cancelled'] .filepond--file-info {
    margin-right: 0;
    display: none;
  }

  .filepond--file .filepond--file-status {
    margin-right: 0;
    margin-left: 0;
  }

  .filepond--file-status {
    align-items: flex-start;
  }

  .filepond--file-status .filepond--file-status-main {
    font-size: 0.7em;
  }

  .filepond--image-clip {
    background-color: transparent;
    border-radius: 5px;
  }

  .filepond--image-preview-wrapper {
    background-color: transparent;
  }

  .filepond--file {
    background-color: transparent;
  }

  .filepond--image-preview {
    background-color: transparent;
  }

  .filepond--image-clip {
    overflow: unset;
  }

  .filepond--credits {
    display: none;
  }
`;

export const Title = styled.div`
  font-family: Calibre-Semibold, sans-serif;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ViewImageButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  letter-spacing: 0.25px;
  color: #e7131a;
  line-height: 25px;
  cursor: pointer;
`;

export const ImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  z-index: 9999;
`;

export const Image = styled.img`
  max-width: 90vw;
  height: 90vh;
`;

export const ErrorFeedback = styled.p`
  font-family: Calibre-Semibold, sans-serif;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 1px;
  margin: 10px 0 0;
  color: #f26900;
  text-transform: uppercase;
`;

export const FilePondContainer = styled(FilePond)`
  border: 2px solid #d6d7da;
  max-width: 300px;
  font-family: 'Calibre-Semibold', sans-serif;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
`;
