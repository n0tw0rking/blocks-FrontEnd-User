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
        query oneUser($id: String!) {
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

  getService(serviceNAme): any {
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
        name: serviceNAme
      },
      errorPolicy: "all"
    }).valueChanges;
  }

  getSubscription(subName): any {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getSubscription($name: String!) {
          oneSubscription(name: $name) {
            _id

            block {
              _id
            }
            service {
              _id
              name
            }
            userMesg {
              _id
              message
            }
          }
        }
      `,
      variables: {
        name: subName
      },
      errorPolicy: "all"
    }).valueChanges;
  }

  getBlockSubs(blockName) {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getBlockSubs($name: String!) {
          oneBlockSubs(name: $name) {
            _id
            name
          }
        }
      `,
      variables: {
        name: blockName
      },
      errorPolicy: "all"
    }).valueChanges;
  }
}
