# Background

This library provides the means to track user behavior across the site. Since this library utilizes client-side APIs such as GA and Segment, this is only intended to be used client-side.

# Setup

Before you can begin tracking user behavior, your app must inject a script tag to the document head. This will cause the library dependencies to be loaded client side.

The means to do this may vary depending on your app.
The following example is with nextjs.
Alternatively, you may use something like helmet to inject the script.

```
// in /src/pages/_document.tsx
// import the snippet component
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
...
render(): JSX.Element {
  const segmentWriteKey = <SOME_ENV_VAR>;
  return (
    <Html lang="en">
      <Head>
        {segmentWriteKey && (
          <AnalyticsSnippet
            appName="Vroom Web - My App"
            segmentWriteKey={segmentWriteKey}
          />
        )}
        ...
      </Head>
    </Html>
  );
}
```

# Usage

This library provides an AnalyticsHandler base class that comprises of several base tracking methods. These methods include `page` to capture page views, `track` to track specific user actions, `identify` to associate some string (such as an email) with the user's identity, and `registerExperiment`, which is covered below.

Typically, analytics events are unique to a particular app. So, instead of adding method to the base AnalyticsHandler, we recommend extending it for your particular app.

In your app's code:
```
import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class MyAppAnalyticsHandler extends BaseAnalyticsHandler {
  trackSomeActionInMyApp(someData: string): void {
    const event = 'Some Action';
    const category = 'My App';
    const properties = {
      category,
      someData
    };
    this.track(event, properties);
  }
}
```

Then you can create an instance of your extended analytics handler to track the action.

```
import { MyAppAnalyticsHandler } from 'path/to/my/code';
const myAppAnalyticsHandler = new MyAppAnalyticsHandler();
myAppAnalyticsHandler.trackSomeActionInMyApp('wow!');
```

# Registering A/B Tests

In order to do A/B testing, you need to keep track of what experiments a user has seen, and what variants they were bucketed into, while they engage in certain behavior across the site. The actually retrieval and bucketing of A/B tests is handled by the @vroom-web/experiment-sdk library. However, since this library provides the means to track user behavior, it must become aware of such experiments.

The way we inform this library about an A/B test is by `registering` that experiment.

```
analyticsHandler.registerExperiment(experiment);
```

If you forget to register your experiment, the test metrics shown on our analytics backend dashboards will not be accurate, and you may need to restart the test.
