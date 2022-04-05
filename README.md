# backstage-auth0-createapp-poc

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
            (where we insert the project name in s24 url e.g backstage-auth-poc
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
    NOTE: possibly Auth0 actions are more suitable? To investigate.
3.  
```


### TODO
gitlab remote not enabled