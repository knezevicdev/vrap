/* eslint-disable @typescript-eslint/camelcase */
import { mocked } from 'ts-jest';

import AnalyticsHandler from './AnalyticsHandler';
import { page as segmentPage, track as segmentTrack } from './segment';

jest.mock('./segment');

test('All VIT params are added to segmentTrack', () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = {
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    ancestorOrigins: {
      length: 0,
      contains: jest.fn(),
      item: jest.fn(),
    },
    hash: 'N/A',
    host: 'N/A',
    hostname: 'N/A',
    href: 'N/A',
    origin: 'N/A',
    pathname: 'N/A',
    port: 'N/A',
    protocol: 'N/A',
    search:
      '?vit_source=source&vit_medium=medium&vit_campaign=campaign&vit_term=term&vit_content=content&vit_dest=dest',
  };
  const analyticsHandler = new AnalyticsHandler();
  analyticsHandler.track('Test Event', { testKey: 'testValue' });
  expect(segmentTrack).toHaveBeenCalledWith('Test Event', {
    experimentCombination: undefined,
    testKey: 'testValue',
    vit_campaign: 'campaign',
    vit_content: 'content',
    vit_dest: 'dest',
    vit_medium: 'medium',
    vit_source: 'source',
    vit_term: 'term',
  });
  mocked(segmentTrack).mockReset();
  delete window.location;
  window.location = originalLocation;
});

test('Some VIT params are added to segmentTrack', () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = {
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    ancestorOrigins: {
      length: 0,
      contains: jest.fn(),
      item: jest.fn(),
    },
    hash: 'N/A',
    host: 'N/A',
    hostname: 'N/A',
    href: 'N/A',
    origin: 'N/A',
    pathname: 'N/A',
    port: 'N/A',
    protocol: 'N/A',
    search: '?vit_source=source1&vit_dest=dest1',
  };
  const analyticsHandler = new AnalyticsHandler();
  analyticsHandler.track('Test Event', { testKey: 'testValue' });
  expect(segmentTrack).toHaveBeenCalledWith('Test Event', {
    experimentCombination: undefined,
    testKey: 'testValue',
    vit_dest: 'dest1',
    vit_source: 'source1',
  });
  mocked(segmentTrack).mockReset();
  delete window.location;
  window.location = originalLocation;
});

test('All VIT params are added to segmentPage', () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = {
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    ancestorOrigins: {
      length: 0,
      contains: jest.fn(),
      item: jest.fn(),
    },
    hash: 'N/A',
    host: 'N/A',
    hostname: 'N/A',
    href: 'N/A',
    origin: 'N/A',
    pathname: 'N/A',
    port: 'N/A',
    protocol: 'N/A',
    search:
      '?vit_source=source&vit_medium=medium&vit_campaign=campaign&vit_term=term&vit_content=content&vit_dest=dest',
  };
  const analyticsHandler = new AnalyticsHandler();
  analyticsHandler.page('Test Page', 'Test Category');
  expect(segmentPage).toHaveBeenCalledWith('Test Page', {
    category: 'Test Category',
    experimentCombination: undefined,
    name: 'Test Page',
    vit_campaign: 'campaign',
    vit_content: 'content',
    vit_dest: 'dest',
    vit_medium: 'medium',
    vit_source: 'source',
    vit_term: 'term',
  });
  mocked(segmentPage).mockReset();
  delete window.location;
  window.location = originalLocation;
});

test('Some VIT params are added to segmentPage', () => {
  const originalLocation = window.location;
  delete window.location;
  window.location = {
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    ancestorOrigins: {
      length: 0,
      contains: jest.fn(),
      item: jest.fn(),
    },
    hash: 'N/A',
    host: 'N/A',
    hostname: 'N/A',
    href: 'N/A',
    origin: 'N/A',
    pathname: 'N/A',
    port: 'N/A',
    protocol: 'N/A',
    search: '?vit_source=source1&vit_dest=dest1',
  };
  const analyticsHandler = new AnalyticsHandler();
  analyticsHandler.page('Test Event', 'Test Category');
  expect(segmentPage).toHaveBeenCalledWith('Test Event', {
    category: 'Test Category',
    experimentCombination: undefined,
    name: 'Test Event',
    vit_dest: 'dest1',
    vit_source: 'source1',
  });
  mocked(segmentPage).mockReset();
  delete window.location;
  window.location = originalLocation;
});
