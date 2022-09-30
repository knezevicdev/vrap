import { cloneDeep } from 'lodash';
import { TraversalCallbackContext, traverse } from 'object-traversal';

const PII_KEYS = ['firstName', 'lastName', 'email', 'user_email'];

export default function redactObject<T extends Record<string, unknown>>(
  object: T
): T {
  const redactedObject = cloneDeep(object);

  traverse(redactedObject, redactPII, { maxDepth: 5 });

  return redactedObject;
}

function redactPII({ parent, key, value }: TraversalCallbackContext) {
  if (
    parent &&
    key &&
    value &&
    typeof value === 'string' &&
    PII_KEYS.includes(key)
  ) {
    parent[key] = value.slice(0, 2) + '*****';
  }
}
