import fs from 'fs';
import path from 'path';

describe('analytics', () => {
  // This test was added to ensure that code changes do not break analytics in segment.
  // Segment is configured to listen for a specific identify call based on the url.
  // If an identify call occurs from the configured url, that data will be forwarded to our partner, Rock.
  // If this test fails, it is because you moved the src/pages/inventory/[slug]/submit-contact file.
  // The implication is that the url has changed.
  // In addition to fixing this test, you will need to go into segment and update the webhook configuration,
  // so that segment listens for identify calls on whatever url the submit contact form was moved to.
  // If you do not see a "webhook" destination in segment, it is safe to remove this test.
  test('The page url for the identify call in handleSubmit() has not changed', () => {
    const fileExistsAtExpectedLocation = (): boolean => {
      try {
        const filepath = path.resolve(
          __dirname,
          '../../../../pages/inventory/[slug]/submit-contact.tsx'
        );
        return fs.existsSync(filepath);
      } catch {
        return false;
      }
    };
    expect(fileExistsAtExpectedLocation()).toBeTruthy();
  });
});
