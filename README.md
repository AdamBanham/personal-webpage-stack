# personal-webpage-stack
Personal Webpage - Vue Frontend - AWS backend

## Add publication to webpage

To add a new publication to the website, load container and start up vue 
frontend development stack in the directory `frontend`.

Then, add author accepted version to the directory 
`frontend/public/papers/[year]/[pdf]`. At the same time, if a bibtex json
is available, add that json to `frontend/public/bibtex/[year]/[bibtex.bib]`.

Finally, add a new record to `frontend/src/views/publications/content.js` by
adding a new Paper to `papers` collection within the file.

## Trigger updates to prod

To trigger changes on prod, a release on GitHub is required as a deployment
action is linked to releases being published. The action updates an S3 bucket,
which then is used for website hosting within AWS.

Note that the action only syncs the bucket with the contents of `frontend/dist`.
So before writting a release, the vue spa needs to be re-built and the built 
resources need to be commited to the repo.