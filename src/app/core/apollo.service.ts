import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  getUser(currentUser): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($id: String!) {
          oneUser(id: $id) {
            _id
            isAdmin
            isSuperAdmin
            email
            password
            userSubscription {
              _id
              name
              user {
                _id
              }
              block {
                _id
                name
                location
              }
            }
          }
        }
      `,
      variables: {
        id: currentUser
      },
      errorPolicy: "all"
    }).valueChanges;
  }

  getService(): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($name: String!) {
          oneService(name: $name) {
            _id
            subscriptionId {
              _id
            }
          }
        }
      `,
      variables: {
        name: "water"
      },
      errorPolicy: "all"
    }).valueChanges;
  }

  getSubscription(): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query($name: String!) {
          oneSubscription(name: $name) {
            _id

            block {
              _id
            }
          }
        }
      `,
      variables: {
        name: "BBB"
      },
      errorPolicy: "all"
    }).valueChanges;
  }
}
