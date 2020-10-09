# Background

This SDK is to be used for A/B testing.

A/B testing involves several steps.
1) Retrieve information about experiments.
2) Bucket a user into a specific variant for each experiment.
3) Adapt the functionality or appearance of an application based on the user's unique variant.
4) Track the actions of the user, along with what variants they were bucketed into.

This SDK provides utilities for steps 1 and 2.
Step 3 is handled by the application that uses this SDK,
while step 4 is the job of the analytics library.

Step 1 involves retrieving information from our experiment service (experiments.vroomapi.com).
Step 2 involves taking some consistent user id, hashing it together with an experiment id retrieved in the first step, and ensuring this hash is repeatable. A given user must be bucketed into the same variant consistently. We don't want users to see one variant, and then a different variant on a second viewing. Their experience should remain consistent for the lifetime of the test.

Notice that step 2 is user-specific, because User A may be bucketed into a different variant than User B.
Because of this, step 2 must be done client-side.
Otherwise, we would not be able to cache our pages.

# Usage

This library exports an experiment SDK class which can be used in your app to create an experiment SDK instance.

```
import { ExperimentSDK } from '@vroom-web/experiment-sdk';

const experimentSDK = new ExperimentSDK();
```

In order to abstract most of these details away from developers,
an ExperimentSDK instance provides a "kitchen-sink" method called: `getAndLogExperimentClientSide`.
This particular method only requires a developer to pass the experiment ID they want to pull
from the experiment service. The SDK handles the details of bucketing a user into a variant.

Ensure this method is called client side only.

```
useEffect(() => {
  experimentSDK
    .getAndLogExperimentClientSide('my-experiment-id')
    .then((experiment) => ... /* update state or do something with the bucketed experiment */ );
}, []);
```

In the example above, "experiment" resolved in the promise will be undefined if 
no such experiment exists in the service. Otherwise, it will return an experiment with an assigned variant.

If the experiment is not running, the default variant (0) is used.
If the experiment has a winner, the winning variant is used.

# Tracking User Behavior

Be sure to read the docs for our analytics library to ensure that active experiments are registered.
