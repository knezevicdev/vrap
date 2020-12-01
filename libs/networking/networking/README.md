This library exports types that are generated from our backend graphql schema.

In order to generate new types for an updated graphql schema, run the `generate:graphql-types` script. That will hit the backend and generate typescript types based on the schema.

Once you generate the types, you will need to rebuild the library if you want the updated schema to be exposed in the distributed version of this library.
