import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";

const uri = "http://localhost:4000/graphql"; // <-- add the URL of the GraphQL server here
// const uri = "https://blocks-backend.herokuapp.com/graphql";

const token = localStorage.getItem("token");

export function provideApollo(httpLink: HttpLink, apollo: Apollo) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: "charset=utf-8"
    },
    method: "GET"
  }));

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}` || ""
    }
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all"
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {
  constructor(public apollo: Apollo, public httpLink: HttpLink) {
    this.apollo.createNamed("mute", {
      link: this.httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}
