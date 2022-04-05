/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// NOTE: oktaAuthApiRef exists but auth0AuthApiRef deprecated https://backstage.io/docs/api/deprecations#generic-auth-api-refs
import {
  ApiRef,
  BackstageIdentityApi,
  createApiRef,
  OAuthApi,
  ProfileInfoApi,
  SessionApi
} from '@backstage/core-plugin-api';

//export const acmeAuthApiRef: ApiRef<
export const auth0AuthApiRef: ApiRef<
    OAuthApi &
    ProfileInfoApi &
    BackstageIdentityApi &
    SessionApi
    > = createApiRef({
  //id: 'internal.auth.acme',
  id: 'internal.auth.auth0',
});

export const providers = [
  {
    id: 'auth0-auth-provider',
    title: 'Auth0',
    message: 'Sign In using Auth0',
    apiRef: auth0AuthApiRef,
  }
];
