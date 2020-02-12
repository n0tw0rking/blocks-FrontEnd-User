import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// const uri = "https://hotgraphapi20200206111431.azurewebsites.net/";
// const uri1 = "https://blocks-backend.herokuapp.com/graphql";
const token = localStorage.getItem("token");
/*
 IMPORTANT NOTE :
 TOKEN INTERCEPTOR IS TAKING CARE OF THE TOKEN INJECTION.
*/
@NgModule({
  exports: [ApolloModule, HttpLinkModule, HttpClientModule]
})
export class GraphQLModule {
  private uri2 = "https://hotgraphapi20200206111431.azurewebsites.net";
  private uri1 = "https://blocks-backend.herokuapp.com/graphql";

  constructor(public apollo: Apollo, public httpLink: HttpLink) {
    const options1: any = {
      uri: this.uri1
    };
    this.apollo.createDefault({
      link: this.httpLink.create(options1),
      cache: new InMemoryCache()
    });

    const options2: any = { uri: this.uri2 };
    this.apollo.createNamed("ASP", {
      link: this.httpLink.create(options2),
      cache: new InMemoryCache()
    });
  }
}
