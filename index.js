const { ApolloServer, gql } = require("apollo-server");
const { date } = require("casual");
const casual = require("casual");
const { GraphQLScalarType, Kind } = require('graphql');




const typeDefs = gql`
scalar Date
  type Cat {
    id: ID!
    name: String!
    age: Int!
    nice: Boolean
    starrable: String!
  }

  type UserAddress{
    active:Boolean
    addressLine1: String!
    addressLine2: String!
    addressLine3: String
    addressLine4: String
    addressType: String!
    city: String!
    country: String!
    create: Date!
    id: ID!
    modified: Date!
    postalCode: Int!
    state: String!
    user: Date!
    userId: ID!
  }

  input AddressDtoInput{
    active:Boolean
    addressLine1: String
    addressLine2: String
    addressLine3: String
    addressLine4: String
    addressType: String
    city: String
    country: String
    create: Date
    id: ID!
    modified: Date!
    postalCode: Int!
    state: String!
    user: Date!
    userId: ID!

  }
  type Query {
    allAddresses: [UserAddress!]!
  }
  type Mutation{
    addUser (addressLine1: String, 
            addressLine2: String): UserAddress
    addFullUser ( input: AddressDtoInput) : UserAddress
  }
`;

const mocks = {
  ID: () => casual.uuid,
  Int: () => casual.integer(0,100),
  String: () => casual.first_name,
  Boolean: () => true,
  Date: () => casual.date()
  
};

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(({ url }) => console.log(`Server Running on port ${url}`));
