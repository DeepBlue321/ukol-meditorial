import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://directus.devmed.cz/graphql',
  cache: new InMemoryCache(),
});

export const GET_BLOGS = gql`
  query GetBlogs($limit: Int!, $offset: Int!) {
    contents {
        issue
        date_updated
        labels {
        label {
            name
        }
        }
        id
        section {
        name
        }
        specializations {
        specialization {
            name
        }
        }
        type {
        name
        }
        language {
        name
        }
        web {
        name
        }
        translations {
        name
        image {
            height
            width
            filename_download
            filename_disk
            folder
        }
        perex
        }
    }
}
`;

export default client;