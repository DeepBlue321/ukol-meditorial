import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://directus.devmed.cz/graphql',
  cache: new InMemoryCache(),
});

export const GET_BLOGS_LIST = gql`
  query GetBlogs($limit: Int!, $offset: Int!, $sort: [String!]) {
    contents(limit: $limit, offset: $offset, sort: $sort) {
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
        theme {
      name
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
        translations(sort:$sort ) {
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

export const GET_SECTIONS_LIST = gql`
  query GetSections($limit: Int!) {
    sections(limit: $limit) {
    id
    name
  }
}
`;
export const GET_BLOGS_BY_ID = gql`
  query GetBlogsById($id: ID!) {
    contents_by_id(id: $id) {
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
            content
        name
        image {
            height
            width
            filename_download
            filename_disk
            folder
        }
    }
}
}
`;

export { client };