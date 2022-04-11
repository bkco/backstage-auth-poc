# backstage-auth-poc

## create a backstage project using the "create-app" command
``` 
1.  Follow the backstage guide for an "app" (another option to checkout full backstage suite to develop plugins is out-of-scope):
        https://backstage.io/docs/getting-started/
2.  Install:
        Docker e.g must be installed locally
        yarn e.g npm install -g yarn
        node e.g nvm use v16.14.0
    Then instructions:
        https://backstage.io/docs/getting-started/create-an-app
    where:
        cd /path/to/project
        cd /home/brian/Documents/CODE/GITHUB/backstage-auth-poc
        npx @backstage/create-app
    and:
        * use sqllite
        * named the application "app"
3.  The app install tells us:
        Run the app: 
            cd /home/brian/Documents/CODE/GITHUB/backstage-auth-poc/app
            yarn dev
        Set up the software catalog: 
            https://backstage.io/docs/features/software-catalog/configuration
        Add authentication: 
            https://backstage.io/docs/auth/
        Two servers are running:
        1.  Frontend application:
                http://localhost:3000/catalog
        2.  Backend application (callback urls etc):
                http://localhost:7007
                
4.  Login first time:
        http://localhost:3000/catalog
5.  Add authentication guide:
        https://backstage.io/docs/auth/

```

## Setup test identity provider Auth0
``` 
1.  Login to auth0 and create new SPA application:
        Application > New Application > Single Page Application
    where: 
        name: backstage-auth0-poc
        clientId: xxxx
        domain: mydomain.eu.auth0.com
        clientSecret: xxxx
    and:
        Allowed Callback URLs:
            (where we insert the project name in url e.g backstage-auth-poc
            http://localhost:7007/api/auth/auth0/handler/frame, https://backstage-auth-poc.account.and.path.net/api/auth/auth0/handler/frame
        Allowed logout URLs:
            http://localhost:7007/api/auth/auth0/logout, https://backstage-auth-poc.account.and.path.net/api/auth/auth0/logout           
    and: 
        save
        
2.  Add an "Auth Pipeline" rule as a check users is from specific organization:
        Auth Pipeline > Rule > Create Rule
    where:
        name: is-member-of-yourdomain-rule
    and empty rule with content:
        function emailDomainWhitelist(user, context, callback) {
    
          // Access should only be granted to verified users.
          //if (!user.email || !user.email_verified) {
            //return callback(new UnauthorizedError('Access denied.'));
          //}
        
          const whitelist = ['yourdomainhere.com']; //authorized domains
          const userHasAccess = whitelist.some(
              function (domain) {
                const emailSplit = user.email.split('@');
                return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
              });
        
          if (!userHasAccess) {
            return callback(new UnauthorizedError('Access denied.'));
          }
        
          return callback(null, user, context);
        }
3.  Add a user in Auth0 console as we want to use it as our identity provider.
    * make sure the user is configured to utilise Username-Password authentication
    * register an email address with a domain that matches the domain used in the rule above!
    * this user will be asked if they trust the backstage application when they try to login
    via the Oauth dialog screen during their first backstage login.
```

## Add Auth0 to application
```
1.  Add credentials to:
        /home/brian/Documents/CODE/GITHUB/backstage-auth-poc/app/app-config.yaml
    where:
        auth:
          environment: development
          providers:
            auth0:
              development:
                clientId: ${AUTH_AUTH0_CLIENT_ID}
                clientSecret: ${AUTH_AUTH0_CLIENT_SECRET}
                domain: ${AUTH_AUTH0_DOMAIN_ID}
    Export vars in your bash shell that the backstage application is launched from.
        export AUTH_AUTH0_CLIENT_ID=xxxx
        and so on.
2.  
```

## Add Github integration
``` 
1.  Follow guide:
        https://backstage.io/docs/integrations/github/org
    where app-config.yml has:
        integrations:
          github:
            - host: github.com
              token: ${GITHUB_TOKEN}
            ### Example for how to add your GitHub Enterprise instance using the API:
            # - host: ghe.example.net
            #   apiBaseUrl: https://ghe.example.net/api/v3
            #   token: ${GHE_TOKEN}
    In above use normal github or github enterprise.
2.  
```


### TODO
gitlab remote not enabled