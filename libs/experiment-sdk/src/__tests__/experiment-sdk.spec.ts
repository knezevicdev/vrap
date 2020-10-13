import { ExperimentSDK } from '../experiment-sdk';
import { ExperimentDto, HttpClient, mapExperimentDTO } from '../httpclient';
import { Experiment, ExperimentStatus, Impression } from '../types';

class MockHttpClient implements HttpClient {
  nextResponse: ExperimentDto | undefined = undefined;
  nextMeta?: Experiment[] = undefined;

  async fetchExperiment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _experimentId: string
  ): Promise<Experiment | undefined> {
    return this.nextResponse === undefined
      ? undefined
      : mapExperimentDTO(this.nextResponse);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logImpression(_impression: Impression): Promise<void> {
    return;
  }

  fetchExperimentMeta(): Promise<Experiment[]> {
    return Promise.resolve(this.nextMeta || []);
  }
}

const testHost = 'http://localhost:4000';

describe('ExperimentSDK', () => {
  const testHttpClient = new MockHttpClient();
  const testClient = new ExperimentSDK({
    experimentApiBase: testHost,
    impressionApiBase: 'http://11749cde-6744-4cca-b2d8-0fe26149c3cb.org',
    httpClient: testHttpClient,
  });

  const marketingId = '11749cde-6744-4cca-b2d8-0fe26149c3cb';

  it('Assigns running experiment to correct variant', async () => {
    const experimentId = 'abe';
    testHttpClient.nextResponse = {
      id: experimentId,
      optimizeId: '',
      name: 'Foo',
      status: {
        key: ExperimentStatus.Running,
        display: 'Pending',
      },
      hypothesis: '',
      result: null,
      startTime: null,
      team: '',
      winningVariantId: null,
      variants: [
        {
          name: 'foo',
          weight: 0.5,
        },
        {
          name: 'foo',
          weight: 0.5,
        },
      ],
    };

    const res = await testClient.getExperiment(experimentId, marketingId);
    expect(res && res.assignedVariant).toBe(1);
  });

  it('Assigns completed experiment to default variant', async () => {
    const experimentId = '3l2k32lkj';
    testHttpClient.nextResponse = {
      id: experimentId,
      optimizeId: '',
      name: 'Foo',
      status: {
        key: ExperimentStatus.Completed,
        display: 'Pending',
      },
      hypothesis: '',
      result: null,
      startTime: null,
      team: '',
      winningVariantId: null,
      variants: [
        {
          name: 'foo',
          weight: 0.5,
        },
        {
          name: 'foo',
          weight: 0.5,
        },
      ],
    };

    const res = await testClient.getExperiment(experimentId, marketingId);
    expect(res && res.assignedVariant).toBe(0);
  });

  it('Assigns canceled experiment to default', async () => {
    const experimentId = 'lkjl23kj3';
    testHttpClient.nextResponse = {
      id: experimentId,
      optimizeId: '',
      name: 'Foo',
      status: {
        key: ExperimentStatus.Canceled,
        display: 'Pending',
      },
      hypothesis: '',
      result: null,
      startTime: null,
      team: '',
      winningVariantId: null,
      variants: [
        {
          name: 'foo',
          weight: 0.5,
        },
        {
          name: 'foo',
          weight: 0.5,
        },
      ],
    };

    const res = await testClient.getExperiment(experimentId, marketingId);
    expect(res && res.assignedVariant).toBe(0);
  });

  it('Assigns pending experiment to default', async () => {
    const experimentId = 'nlkn32';
    testHttpClient.nextResponse = {
      id: experimentId,
      optimizeId: '',
      name: 'Foo',
      status: {
        key: ExperimentStatus.Pending,
        display: 'Pending',
      },
      hypothesis: '',
      result: null,
      startTime: null,
      team: '',
      winningVariantId: null,
      variants: [
        {
          name: 'foo',
          weight: 0.5,
        },
        {
          name: 'foo',
          weight: 0.5,
        },
      ],
    };

    const res = await testClient.getExperiment(experimentId, marketingId);
    expect(res && res.assignedVariant).toBe(0);
  });

  it('Assigns missing experiment to default', async () => {
    const experimentId = 'n2l32ln3n';
    testHttpClient.nextResponse = undefined;

    const res = await testClient.getExperiment(experimentId, marketingId);
    expect(res && res.assignedVariant).toBe(undefined);
  });
});
