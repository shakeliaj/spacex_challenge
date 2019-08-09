# spacex_challenge

To run:
1. First clone the github package
2. Navigate to newly created folder (this will need to be done twice, so I just navigate to the folder from two different terminal windows)
3. You can either install the packages with npm or use yarn (I will provide both directions, though I use yarn for adding and updating packages)
    Using Npm:
    **From the command prompt, run:
        "npm install -g webpack"
        "npm install"
    Using Yarn:
    **From the command prompt, run:
        "npm install -g webpack"
        "npm install -g yarn"
        "yarn install"  
4. Once the packages have been successfully installed, run "yarn build" from the terminal window to build out the dependencies for the application
4. Once the build is completed,
    From one of the terminal windows, run: "yarn start"
    And from the other terminal window, run: "yarn server"
5. You should be able to view the page by navigating to localhost:8080

Extras:
1. You can run "yarn lint" to view any linting errors
2. If any linting errors exist, you can run "yarn lint --fix" to fix them
3. You can see the test coverage by running "yarn test", and you can view which lines of code have been tested by clicking on the index.html file located in the coverage folder.

(All of the testing and linting commands can be viewed in the package.json file)

**Also make sure to view the page in responsive mode; this can be done by right clicking the web page, selecing inspect element, and using the responsive controls on the top of the window.**